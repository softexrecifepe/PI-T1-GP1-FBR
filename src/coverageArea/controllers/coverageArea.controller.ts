import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CoverageArea } from '../entities/coverageArea.entity';
import { CoverageAreaService } from './../services/coverageArea.service';
import { Controller, Get, HttpCode, HttpStatus, UseGuards } from "@nestjs/common";
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
}