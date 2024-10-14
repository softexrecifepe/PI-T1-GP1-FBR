import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CoverageArea } from "../entities/coverageArea.entity";
import { Repository } from "typeorm";

@Injectable()
export class CoverageAreaService {
    constructor(
        @InjectRepository(CoverageArea)
        private coverageAreaRepository: Repository<CoverageArea>
    ){ }

    async findAll(): Promise<CoverageArea[]> {
        return await this.coverageAreaRepository.find();
    }

}