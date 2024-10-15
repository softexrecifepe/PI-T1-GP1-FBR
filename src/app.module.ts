import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { CoverageArea } from './coverageArea/entities/coverageArea.entity';
import { CoverageAreaModule } from './coverageArea/coverageArea.module';
import { Offering } from './offering/entities/offering.entity';
import { OfferingModule } from './offering/offering.module';
import { Provider } from './provider/entities/provider.entity';
import { ProviderModule } from './provider/provider.module';
import { Infrastructure } from './infrastructure/entities/infrastructure.entity';
import { InfrastructureModule } from './infrastructure/insfrastructure.module';
import { Request } from './request/entites/request.entity';
import { RequestModule } from './request/request.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_fbr_digital',
      entities: [User, CoverageArea, Offering, Provider, Infrastructure, Request],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    CoverageAreaModule,
    OfferingModule,
    ProviderModule,
    InfrastructureModule,
    RequestModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
