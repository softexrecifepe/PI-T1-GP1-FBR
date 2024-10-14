import { CoverageAreaService } from './services/coverageArea.service';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoverageArea } from "./entities/coverageArea.entity";
import { CoverageAreaController } from './controllers/coverageArea.controller';

@Module({
    imports: [TypeOrmModule.forFeature([CoverageArea])],
    providers:[CoverageAreaService],
    controllers: [CoverageAreaController],
    exports: [TypeOrmModule]
})
export class CoverageAreaModule { }