import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './../entities/provider.entity';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, ILike, Repository } from 'typeorm';

@Injectable()
export class ProviderService {
    constructor(
        @InjectRepository(Provider)
        private providerRepository: Repository<Provider>
    ) { }

    async findAll(): Promise<Provider[]> {
        return await this.providerRepository.find({
            relations: {
                offering: true,
                infrastructure: true
            }
        });
    }

    async findById(id: number): Promise<Provider> {

        let provider = await this.providerRepository.findOne({
            where: {
                id
            },
            relations: {
                offering: true,
                infrastructure: true
            }
        });

        if (!provider)
            throw new HttpException('Provedor não encontrado!', HttpStatus.NOT_FOUND);

        return provider;
    }

    async findByName(fantasy_name: string): Promise<Provider[]> {
        return await this.providerRepository.find({
            where: {
                fantasy_name: ILike(`%${fantasy_name}%`)
            },
            relations: {
                offering: true,
                infrastructure: true
            }
        })
    }

    async create(provider: Provider): Promise<Provider> {
        return await this.providerRepository.save(provider);
    }

    async update(provider: Provider): Promise<Provider> {

        let findProvider = await this.findById(provider.id);

        if (!findProvider || !provider.id)
            throw new HttpException('Provedor não encontrado!', HttpStatus.NOT_FOUND);

        return await this.providerRepository.save(provider);
    }

    async delete(id: number): Promise<DeleteResult> {

        let findProvider = await this.findById(id);

        if (!findProvider)
            throw new HttpException('Provedor não encontrado!', HttpStatus.NOT_FOUND);

        return await this.providerRepository.delete(id);

    }
}