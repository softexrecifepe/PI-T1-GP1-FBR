import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { CoverageArea } from './coverageArea/entities/coverageArea.entity';
import { CoverageAreaModule } from './coverageArea/coverageArea.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_fbr_digital',
      entities: [User, CoverageArea],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    CoverageAreaModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
