import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UtilsModule } from '../core/utils/utils.module';
import { APP_FILTER } from '@nestjs/core';
import { TypeormExceptionFilter } from '../core/typeorm-exception.filter';

@Module({
  providers: [
    UsersService,
    {
      provide: APP_FILTER,
      useClass: TypeormExceptionFilter,
    },
  ],
  imports: [TypeOrmModule.forFeature([User]), UtilsModule],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
