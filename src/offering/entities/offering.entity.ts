import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CoverageArea } from "../../coverageArea/entities/coverageArea.entity";
import { Provider } from "../../provider/entities/provider.entity";

@Entity({ name: 'tb_offering' })
export class Offering {
  
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  tipoPlano: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column({nullable: false})
  velocidade: number; // Velocidade em MB/GB

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 50, nullable: false })
  sla: string; // SLA do plano

  @ApiProperty()
  @IsNotEmpty()
  @Column({nullable: false})
  preco: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'float', default: 0 })
  ranking: number; // Campo para armazenar o ranking

  @ApiProperty()
  @OneToMany(() => CoverageArea, (coverageArea) => coverageArea.offering)
  coverageArea: CoverageArea[]

  @ManyToOne(() => Provider, (provider) => provider.offering, {
    onDelete: "CASCADE"
})
provider: Provider

}