import { IsDateString, IsNumber } from "class-validator";

export class CreateSessionDto {
    @IsDateString()
    startTime: string

    @IsNumber()
    price: number

    @IsNumber()
    hallId: number

    @IsNumber()
    movieId: number
}
