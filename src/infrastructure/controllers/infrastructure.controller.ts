import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { InfrastructureService } from "../services/infrastructure.service";
import { Infrastructure } from "../entities/infrastructure.entity";


@ApiTags('Infrastructure')
@UseGuards(JwtAuthGuard)
@Controller('/infrastructure')
@ApiBearerAuth()
export class InfrastructureController{
    constructor(private readonly infrastructureService: InfrastructureService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Infrastructure[]> {
        return this.infrastructureService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Infrastructure> {
        return this.infrastructureService.findById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() infrastructure: Infrastructure): Promise<Infrastructure> {
        return this.infrastructureService.create(infrastructure);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() infrastructure: Infrastructure): Promise<Infrastructure> {
        return this.infrastructureService.update(infrastructure)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.infrastructureService.delete(id)
    }

}