import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { Bcrypt } from '../auth/bcrypt/bcrypt';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], 
  providers: [UserService, Bcrypt],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}