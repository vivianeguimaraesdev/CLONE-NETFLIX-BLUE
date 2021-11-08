import { IsEmail, IsString, Length, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 100)
  name: string;

  @IsString()
  @IsEmail({}, { message: 'Informe um endereço de email válido' })
  email: string;

  @IsString()
  @Length(6, 32)
  password: string;

  @IsString()
  @Length(6, 32)
  passwordConfirmation: string;
}
