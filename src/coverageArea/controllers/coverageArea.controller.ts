import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CoverageArea } from '../entities/coverageArea.entity';
import { CoverageAreaService } from './../services/coverageArea.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@ApiTags('CoverageArea')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller("/coverage-area")
export class CoverageAreaController { 
    constructor(private readonly coverageAreaService: CoverageAreaService){ }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<CoverageArea[]> { 
        return this.coverageAreaService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<CoverageArea> {
        return this.coverageAreaService.findById(id);
    }
    
    @Get('/provider-name/:providerName')
    @HttpCode(HttpStatus.OK)
    findByProviderName(@Param('providerName')providerName: string): Promise<CoverageArea[]> {
        return this.coverageAreaService.findByProviderName(providerName); 
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() coverageArea: CoverageArea): Promise<CoverageArea>{
        return this.coverageAreaService.create(coverageArea)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() coverageArea: CoverageArea): Promise<CoverageArea> { 
        return this.coverageAreaService.update(coverageArea)
    }
}