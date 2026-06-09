import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsString, Max } from "class-validator";

export class CreateMovieDto {

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsDateString()
    releaseDate: string

    @IsInt()
    @IsNumber()
    @Max(500)
    duration: number
}
