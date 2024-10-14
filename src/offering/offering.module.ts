import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Offering } from "./entities/offering.entity";
import { OfferingService } from "./services/offering.service";
import { OfferingController } from "./controllers/offering.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Offering])],
    providers: [OfferingService],
    controllers: [OfferingController],
    exports: [TypeOrmModule]
})
export class OfferingModule {}