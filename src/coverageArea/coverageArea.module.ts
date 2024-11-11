import { CoverageAreaService } from './services/coverageArea.service';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoverageArea } from "./entities/coverageArea.entity";
import { CoverageAreaController } from './controllers/coverageArea.controller';
import { OfferingModule } from '../offering/offering.module';
import { OfferingService } from '../offering/services/offering.service';
import { ProviderModule } from '../provider/provider.module';
import { ProviderService } from '../provider/services/provider.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [TypeOrmModule.forFeature([CoverageArea]), OfferingModule, ProviderModule, HttpModule],
    providers:[CoverageAreaService, OfferingService, ProviderService],
    controllers: [CoverageAreaController],
    exports: [TypeOrmModule]
})
export class CoverageAreaModule { }