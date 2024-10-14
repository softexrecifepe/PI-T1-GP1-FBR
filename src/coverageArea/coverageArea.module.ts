import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoverageArea } from "./entities/coverageArea.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CoverageArea])],
    providers:[],
    controllers: [],
    exports: [TypeOrmModule]
})
export class CoverageAreaModule { }