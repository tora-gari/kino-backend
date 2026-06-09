import { IsNotEmpty, IsString } from "class-validator";

export class CreateCityDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly slug: string;
}