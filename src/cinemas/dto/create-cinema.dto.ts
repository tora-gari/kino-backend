import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateCinemaDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    cityId: number;
}