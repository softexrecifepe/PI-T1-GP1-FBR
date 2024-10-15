import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Offering } from "./entities/offering.entity";
import { OfferingService } from "./services/offering.service";
import { OfferingController } from "./controllers/offering.controller";
import { ProviderModule } from "../provider/provider.module";
import { ProviderService } from "../provider/services/provider.service";


@Module({
    imports: [TypeOrmModule.forFeature([Offering]), ProviderModule],
    providers: [OfferingService, ProviderService],
    controllers: [OfferingController],
    exports: [TypeOrmModule]
})
export class OfferingModule {}