import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Infrastructure } from "./entities/infrastructure.entity";
import { ProviderModule } from "../provider/provider.module";
import { InfrastructureService } from "./services/infrastructure.service";
import { ProviderService } from "../provider/services/provider.service";
import { InfrastructureController } from "./controllers/infrastructure.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Infrastructure]), ProviderModule],
    providers: [InfrastructureService, ProviderService],
    controllers: [InfrastructureController],
    exports: [TypeOrmModule]
})
export class InfrastructureModule {}