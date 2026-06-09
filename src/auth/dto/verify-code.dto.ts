import { ApiProperty } from "@nestjs/swagger";
import { IsString, isString } from "class-validator";

export class VerifyCodeDto {
    @ApiProperty({
        description: 'Номер телефона',
        example: '+770712345678'
    })

    @IsString()
    phoneNumber: string;

    @ApiProperty({
        description: 'Код подтверждения из СМС',
        example: '1234',
    })

    @IsString()
    code: string;
}