import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): User[] {
    return this.usersService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): User {
    return this.usersService.getById(id);
  }

  @Post()
  create(@Body() user: Omit<User, 'id'>): User {
    return this.usersService.create(user);
  }

  @Put(':id')
  replace(@Param('id', ParseIntPipe) id: number, @Body() user: Omit<User, 'id'>): User {
    return this.usersService.replace(id, user);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() partial: Partial<User>): User {
    return this.usersService.update(id, partial);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): { message: string } {
    this.usersService.delete(id);
    return { message: `User with ID ${id} deleted.` };
  }
}
