/* eslint-disable prettier/prettier */
import { IsEmail,IsString, IsNotEmpty } from 'class-validator';
export class LoginDto {

  @IsString()
  @IsEmail({}, { message: 'Informe um endereço de email válido' })
  email: string;

  @IsNotEmpty({ message: 'Campo de senha vazio, informe sua senha' })
  password: string;
}
