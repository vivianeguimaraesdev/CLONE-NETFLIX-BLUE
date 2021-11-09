import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserRole } from './enum/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

//Métodos com Auth Guard e Use Guard, restrigema a autorização e autenticação
//Por exemplo criação de admin, só é feito por admin
//Delete feito apenas por admins
//Autorização -> é você não poder acessar um recurso por questões de privilégio.
//Autenticação -> é você acessar uma aplicação e validar a sua identidade.
//Deixar comentado o auth guard e roles guard já muda a permissão(autorização)

//Rota 'user' para organização do código
@Controller('user')
export class UsersController {
  constructor(private service: UsersService) {}
  //Registro do usuário - form padrão
  @Post('create-user')
  createUser(@Body() data: CreateUserDto): Promise<User> {
    delete data.passwordConfirmation;
    return this.service.create(data, UserRole.USER);
  }
  //Registro do admin -> fazer um form diferenciado no front
  @Post('create-admin')
  //@Role(UserRole.ADMIN)
  //@UseGuards(AuthGuard(), RolesGuard)
  createAdmin(@Body() data: CreateUserDto): Promise<User> {
    delete data.passwordConfirmation;
    return this.service.create(data, UserRole.ADMIN);
  }

  @Get('find/:id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string): Promise<User> {
    return this.service.findOne(id);
  }

  //Deixar a rota sempre primeiro
  @Get('find-all')
  @UseGuards(AuthGuard())
  findMany() {
    return this.service.findMany();
  }

  //Apenas admin logado pode deletar outro user
  @Delete('delete/:id')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  deleteOne(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.deleteOne(id);
  }
}
