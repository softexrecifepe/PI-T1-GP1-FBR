import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CoverageArea } from '../entities/coverageArea.entity';
import { CoverageAreaService } from './../services/coverageArea.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@ApiTags('CoverageArea')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('/coverage-area')
export class CoverageAreaController {
  constructor(private readonly coverageAreaService: CoverageAreaService) {}

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
  findByProviderName(
    @Param('providerName') providerName: string,
  ): Promise<CoverageArea[]> {
    return this.coverageAreaService.findByProviderName(providerName);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() coverageArea: CoverageArea): Promise<CoverageArea> {
    return this.coverageAreaService.create(coverageArea);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() coverageArea: CoverageArea): Promise<CoverageArea> {
    return this.coverageAreaService.update(coverageArea);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.coverageAreaService.delete(id);
  }

  @Get('nearby/:cep')
  @ApiOperation({ summary: 'Find coverage areas near a specific CEP' })
  @ApiResponse({
    status: 200,
    description: 'List of coverage areas within range of the given CEP',
    type: CoverageArea,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'No coverage areas found within the specified range',
  })
  async findNearbyCoverageAreas(
    @Param('cep') cep: string,
  ): Promise<CoverageArea[]> {
    try {
      const coverageAreas =
        await this.coverageAreaService.findNearbyCoverageAreas(cep);

      if (coverageAreas.length === 0) {
        throw new HttpException(
          'No coverage areas found within the specified range',
          HttpStatus.NOT_FOUND,
        );
      }

      return coverageAreas;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
