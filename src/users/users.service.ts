import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { CryptoUtilsService } from '../core/utils/crypto-utils/crypto-utils.service';
@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private cryptoUtilsService: CryptoUtilsService,
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
    const hash = await this.cryptoUtilsService.hashPassWord(user.password);
    const secret = (await this.cryptoUtilsService.creatShareKey()).toString(
      'hex',
    );
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        username: user.username,
        password: hash,
        secret,
      })
      .execute();
  }
}
