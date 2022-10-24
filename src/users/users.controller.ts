import { Controller, Get, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  async create(@Req() req) {
    try {
      await this.usersService.create(req.body);
    } catch (e) {
      throw e;
    }
    return true;
  }

  @Get()
  async findAll(@Req() req) {
    const users = await this.usersService.findAll();
    return users.map((user) => {
      const { id, password, ...res } = user;
      return res;
    });
  }
}
