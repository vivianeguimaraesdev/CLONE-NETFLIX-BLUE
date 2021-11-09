import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '@prisma/client';
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class AuthResponse {
  token: string;
  user: User;
}
