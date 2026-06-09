import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SendCodeDto {
    @ApiProperty({
        description: 'Номер телефона',
        example: '+770712345678'
    })

    @IsString()
    phoneNumber: string
}