import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SendCodeDto } from './dto/send-code.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({
    summary: 'Отправка СМС-кода на номер телефона'
  })
  @Post('send-code')
  create(@Body() body: SendCodeDto) {
    return this.authService.sendCode(body.phoneNumber)
  }

  @ApiOperation({
    summary: 'Проверка СМС-кода и выдача токена'
  })
  @Post('verify-code')
  verify(@Body() body: VerifyCodeDto) {
    return this.authService.verifyCode(body.phoneNumber, body.code)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  viewProfile(@Req() req) {
    return req.user;
  }

}
