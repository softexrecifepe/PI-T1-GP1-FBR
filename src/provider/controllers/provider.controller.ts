import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ProviderService } from "../services/provider.service";
import { Provider } from './../entities/provider.entity';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@ApiTags('Provider')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller("/provider")
export class ProviderController {
  constructor(private readonly providerService: ProviderService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Provider[]> {
    return this.providerService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Provider> {
    return this.providerService.findById(id);
  }

  @Get('/fantasy_name/:fantasy_name')
  @HttpCode(HttpStatus.OK)
  findByName(@Param('fantasy_name') fantasy_name: string): Promise<Provider[]> {
    return this.providerService.findByName(fantasy_name);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() provider: Provider): Promise<Provider> {
    return this.providerService.create(provider);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() provider: Provider): Promise<Provider> {
    return this.providerService.update(provider);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.providerService.delete(id);
  }

}