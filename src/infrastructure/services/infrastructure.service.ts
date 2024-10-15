import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Infrastructure } from "../entities/infrastructure.entity";
import { ProviderService } from "../../provider/services/provider.service";


@Injectable()
export class InfrastructureService {
    constructor(
        @InjectRepository(Infrastructure)
        private infrastrutureRepository: Repository<Infrastructure>,
        private providerService: ProviderService
    ) {}

    async findAll(): Promise<Infrastructure[]> {
        return await this.infrastrutureRepository.find({
            relations: {
                provider: true
            }
        });
    }

    async findById(id: number): Promise<Infrastructure> {

        let infrastructure = await this.infrastrutureRepository.findOne({
            where: {
                id
            },
            relations: {
                provider: true
            }
        })

        if(!infrastructure)
            throw new HttpException('Infraestrutura não encontrada!', HttpStatus.NOT_FOUND);

        return infrastructure
    }

    async create(infrastructure: Infrastructure): Promise<Infrastructure> {

        if (infrastructure.provider){

            let provider = await this.providerService.findById(infrastructure.provider.id)

            if (!provider)
                throw new HttpException('Provedor não encontrado!', HttpStatus.NOT_FOUND)

            return await this.infrastrutureRepository.save(infrastructure)
        }

        return await this.infrastrutureRepository.save(infrastructure)
    }

    async update(infrastructure: Infrastructure): Promise<Infrastructure> {

        let findInfrastructure: Infrastructure = await this.findById(infrastructure.id);

        if(!findInfrastructure || infrastructure.id)
            throw new HttpException('Infraestrutura não encontrada!', HttpStatus.NOT_FOUND);

        if (infrastructure.provider){

            let provider = await this.providerService.findById(infrastructure.provider.id)

            if (!provider)
                throw new HttpException('Provedor não encontrado!', HttpStatus.NOT_FOUND)

            return await this.infrastrutureRepository.save(infrastructure)
        }

        return await this.infrastrutureRepository.save(infrastructure)
    }

    async delete(id: number): Promise<DeleteResult> {

        let findInfrastructure = await this.findById(id);

        if(!findInfrastructure)
            throw new HttpException('Infraestrutura não encontrada!', HttpStatus.NOT_FOUND);

        return await this.infrastrutureRepository.delete(id)
    }
}