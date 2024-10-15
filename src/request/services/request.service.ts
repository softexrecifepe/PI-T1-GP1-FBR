import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { ProviderService } from "../../provider/services/provider.service";
import { Request } from "../entites/request.entity";

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private requestRepository: Repository<Request>,
    private providerService: ProviderService
  ) {}

  async findAll(): Promise<Request[]> {
    return await this.requestRepository.find({
      relations: {
        provider: true
    }
    });
  }

  async findById(id: number): Promise<Request> {
    let request = await this.requestRepository.findOne({
      where: {
        id,
      },
      relations: {
        provider: true
    }
    });

    if (!request)
      throw new HttpException('Demanda não encontrada!', HttpStatus.NOT_FOUND);

    return request;
  }

  async findByStatus(status: string): Promise<Request[]> {
    return this.requestRepository.find({
      where: {
        status,
      },
      relations: {
        provider: true
    }
    });
  }

  async create(request: Request): Promise<Request> {

    if (request.provider){

      let provider = await this.providerService.findById(request.provider.id)

      if (!provider)
        throw new HttpException('Provedor não encontrado!', HttpStatus.NOT_FOUND)

      return await this.requestRepository.save(request)
    }

    return await this.requestRepository.save(request)
  }

  async update(request: Request): Promise<Request>{
    
    let findRequest: Request = await this.findById(request.id);

    if (!findRequest || !request.id)
        throw new HttpException("Demanda não encotrada!", HttpStatus.NOT_FOUND)

    if (request.provider){

      let provider = await this.providerService.findById(request.provider.id)

      if (!provider)
        throw new HttpException("Provedor não encontrado!", HttpStatus.NOT_FOUND)

      return await this.requestRepository.save(request)
    }

    return await this.requestRepository.save(request)
  }

  async delete(id: number): Promise<DeleteResult>{

    let findRequest = await this.findById(id);

    if (!findRequest)
        throw new HttpException("Demanda não enontrada!", HttpStatus.NOT_FOUND);

    return await this.requestRepository.delete(id)
  }
}