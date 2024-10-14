import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "tb_coverage_area"})
export class CoverageArea {
    
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 100, nullable: false })
  providerName: string; // Nome do provedor de internet

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'text', nullable: true })
  description: string; // Descrição da área de cobertura

//   @ApiProperty()
//   @IsNotEmpty()
//   @Column({ type: 'varchar', length: 255 })
//   coverageFilePath: string; // Caminho do arquivo de área de cobertura (CSV/KMZ)

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 255, nullable: false })
  city: string; // Cidade onde o provedor oferece cobertura

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 255, nullable: false })
  state: string; // Estado onde o provedor oferece cobertura

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 50, nullable: false })
  technology: string; // Tecnologia usada (fibra, rádio, satélite, etc.)

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: false })
  latitude: number; // Latitude da área de cobertura

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: false })
  longitude: number; // Longitude da área de cobertura

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date; // Data de criação do registro

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date; // Data de atualização do registro
}