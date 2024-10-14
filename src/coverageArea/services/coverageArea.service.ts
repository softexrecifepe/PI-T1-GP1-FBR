import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CoverageArea } from "../entities/coverageArea.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { OfferingService } from "../../offering/services/offering.service";

@Injectable()
export class CoverageAreaService {
    constructor(
        @InjectRepository(CoverageArea)
        private coverageAreaRepository: Repository<CoverageArea>,
        private offeringService: OfferingService
    ){ }

    async findAll(): Promise<CoverageArea[]> {
        return await this.coverageAreaRepository.find({
            relations:{
                offering: true
            }
        });
    }

    async findById(id: number): Promise<CoverageArea> {

        let coverageArea = await this.coverageAreaRepository.findOne({
            where: {
                id
            },
            relations:{
                offering: true
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
            },
            relations:{
                offering: true
            }
        })
    }
    
    async create(coverageArea: CoverageArea): Promise<CoverageArea>{

        if(coverageArea.offering){

            let offering = await this.offeringService.findById(coverageArea.offering.id)

            if(!offering)
                throw new HttpException('Serviço não encontrado!', HttpStatus.NOT_FOUND);

            return await this.coverageAreaRepository.save(coverageArea)
        }

        return await this.coverageAreaRepository.save(coverageArea)
    }

   
    async update(coverageArea: CoverageArea): Promise<CoverageArea> { 
        
        let findCoverageArea: CoverageArea = await this.findById(coverageArea.id)

        if(!findCoverageArea || !coverageArea.id)
            throw new HttpException('Área de Cobertura não localizada!', HttpStatus.NOT_FOUND);

        if (coverageArea.offering){

            let offering = await this.offeringService.findById(coverageArea.offering.id)

            if (!offering)
                throw new HttpException("Serviço não encontrado!", HttpStatus.NOT_FOUND);

            return await this.coverageAreaRepository.save(coverageArea)
        }

        return await this.coverageAreaRepository.save(coverageArea)
    }

    async delete(id: number): Promise<DeleteResult>{
        
        let findCoverageArea = await this.findById(id);

        if (!findCoverageArea)
            throw new HttpException("Área de Cobertura não localizada!", HttpStatus.NOT_FOUND)

        return await this.coverageAreaRepository.delete(id)
    }
}