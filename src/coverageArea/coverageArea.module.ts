import { CoverageAreaService } from './services/coverageArea.service';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoverageArea } from "./entities/coverageArea.entity";
import { CoverageAreaController } from './controllers/coverageArea.controller';
import { OfferingModule } from '../offering/offering.module';
import { OfferingService } from '../offering/services/offering.service';

@Module({
    imports: [TypeOrmModule.forFeature([CoverageArea]), OfferingModule],
    providers:[CoverageAreaService, OfferingService],
    controllers: [CoverageAreaController],
    exports: [TypeOrmModule]
})
export class CoverageAreaModule { }