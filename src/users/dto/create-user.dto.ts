import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsEnum(['admin', 'user', 'guest'], {
        "message": "Invalid role. Role must be one of the following values: admin, user, guest"
    })
    @IsNotEmpty()
    role: 'admin' | 'user' | 'guest';
}