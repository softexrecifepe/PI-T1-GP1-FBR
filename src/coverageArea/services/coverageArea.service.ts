import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CoverageArea } from "../entities/coverageArea.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { OfferingService } from "../../offering/services/offering.service";
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CoverageAreaService {
    constructor(
        @InjectRepository(CoverageArea)
        private coverageAreaRepository: Repository<CoverageArea>,
        private offeringService: OfferingService,
        private httpService: HttpService,
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

    // async findNearbyCoverageAreas(referenceCep: string): Promise<CoverageArea[]> {
    //     const referenceCoordinates = await this.getCoordinatesFromCep(referenceCep);
    //     const coverageAreas = await this.coverageAreaRepository.find({
    //         relations:{
    //             offering: true
    //         }
    //     });
    //     const nearbyCoverageAreas = [];
    
    //     for (const area of coverageAreas) {
    //       const areaCoordinates = await this.getCoordinatesFromCep(area.cep);
    //       if (areaCoordinates) {
    //         const distance = this.calculateDistance(
    //           referenceCoordinates.lat,
    //           referenceCoordinates.lng,
    //           areaCoordinates.lat,
    //           areaCoordinates.lng,
    //         );
    //         if (distance <= area.raio) {
    //           nearbyCoverageAreas.push(area);
    //         }
    //       }
    //     }
    //     return nearbyCoverageAreas;
    //   }


    async findNearbyCoverageAreas(referenceCep: string): Promise<CoverageArea[]> {
        const referenceCoordinates = await this.getCoordinatesFromCep(referenceCep);
        const coverageAreas = await this.coverageAreaRepository.find({
            relations: {
                offering: true,  // Incluindo a relação com Offering
            },
        });
    
        const nearbyCoverageAreas = [];
    
        for (const area of coverageAreas) {
            const areaCoordinates = await this.getCoordinatesFromCep(area.cep);
            if (areaCoordinates) {
                const distance = this.calculateDistance(
                    referenceCoordinates.lat,
                    referenceCoordinates.lng,
                    areaCoordinates.lat,
                    areaCoordinates.lng,
                );
                // Verifica se a área está dentro do raio
                if (distance <= area.raio) {
                    // Calcula o ranking para a oferta associada à área
                    const offering = area.offering;
                    const ranking = offering.preco / offering.velocidade;  // Preço dividido pela velocidade
    
                    // Adiciona o ranking à área de cobertura
                    nearbyCoverageAreas.push({
                        ...area,
                        offeringRanking: ranking,
                    });
                }
            }
        }
    
        // Ordena as áreas de cobertura pela média do preço dividido pela velocidade (ranking)
        nearbyCoverageAreas.sort((a, b) => a.offeringRanking - b.offeringRanking);
    
        return nearbyCoverageAreas;
    }
    
    
    private async getCoordinatesFromCep(cep: string): Promise<{ lat: number; lng: number }> {
        const response = await lastValueFrom(
          this.httpService.get(`https://cep.awesomeapi.com.br/json/${cep}`)
        );
        const { lat, lng } = response.data;
        return { lat: parseFloat(lat), lng: parseFloat(lng) };
    }
    
    private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
        const R = 6371;
        const dLat = this.deg2rad(lat2 - lat1);
        const dLng = this.deg2rad(lng2 - lng1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
          Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    
    private deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    }
     
}