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
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';



@Module({
  imports: [
    ConfigModule.forRoot(),
TypeOrmModule.forRootAsync({
	useClass: ProdService,
    imports: [ConfigModule],
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
