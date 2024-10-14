import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CoverageArea } from "../entities/coverageArea.entity";
import { ILike, Repository } from "typeorm";

@Injectable()
export class CoverageAreaService {
    constructor(
        @InjectRepository(CoverageArea)
        private coverageAreaRepository: Repository<CoverageArea>
    ){ }

    async findAll(): Promise<CoverageArea[]> {
        return await this.coverageAreaRepository.find();
    }

    async findById(id: number): Promise<CoverageArea> {

        let coverageArea = await this.coverageAreaRepository.findOne({
            where: {
                id
            }
        });

        if (!coverageArea)
            throw new HttpException("Área de Cobertura não localizada!", HttpStatus.NOT_FOUND);

        return coverageArea;
    }

    async findByProviderName(providerName: string): Promise<CoverageArea[]> { 
        return await this.coverageAreaRepository.find({
            where: {
                providerName: ILike(`${providerName}`)
            }
        })
    }
    
    async create(coverageArea: CoverageArea): Promise<CoverageArea>{
        return await this.coverageAreaRepository.save(coverageArea)
    }

   
    async update(coverageArea: CoverageArea): Promise<CoverageArea> { 
        
        let findCoverageArea: CoverageArea = await this.findById(coverageArea.id)

        if(!findCoverageArea || !coverageArea.id)
            throw new HttpException('Área de Cobertura não localizada!', HttpStatus.NOT_FOUND);

        return await this.coverageAreaRepository.save(coverageArea)
    }
}