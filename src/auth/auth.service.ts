import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private otpCache = new Map<string, string>();
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async sendCode(phoneNumber: string) {
    const code = Math.floor(1000 + Math.random() * 9000).toString();

    this.otpCache.set(phoneNumber, code);

    console.log(`[SMS-Simulation] СМС для ${phoneNumber}: код ${code}`);

    return { success: true, message: 'Код отправлен' }
  }

  async verifyCode(phoneNumber: string, code: string) {

    const tempCode = this.otpCache.get(phoneNumber);

    if (!tempCode || tempCode !== code) {
      throw new UnauthorizedException('Неверный код');
    }

    let user = await this.usersService.findByPhoneNumber(phoneNumber);

    if (!user) {
      user = await this.usersService.create(phoneNumber);
    }

    this.otpCache.delete(phoneNumber);

    const payload = {
      sub: user.id,
      phoneNumber: user.phoneNumber,
      role: user.role
    };

    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }

}
