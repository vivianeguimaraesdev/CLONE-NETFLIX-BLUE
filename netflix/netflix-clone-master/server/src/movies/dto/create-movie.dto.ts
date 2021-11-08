/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString,Length, IsDate } from 'class-validator';
export class CreateMovieDto {
  @IsNotEmpty({ message: 'Campo"vazio" inválido, informe o Nome do filme' })
  name: string;

  @IsNotEmpty({ message: 'Campo"vazio" inválido, informe a data de lançamento do filme' })
  
  year: Date;

  @IsNotEmpty()
  length: Date;

  @IsString()
  @Length(1, 500)
  storyline: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}