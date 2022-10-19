import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[] | undefined> {
    return this.userRepository.find();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete({ id });
  }

  async create(user: User): Promise<any> {
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        id: user.id,
        username: user.username,
        password: user.password,
      })
      .execute();
  }
}
