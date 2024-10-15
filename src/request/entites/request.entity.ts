import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Provider } from "../../provider/entities/provider.entity";

@Entity({ name: 'tb_request' })
export class Request {
 
  @ApiProperty() 
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty() 
  @Column({ type: 'text' })
  descricao: string;

  @ApiProperty() 
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data_criacao: Date;

  @ApiProperty() 
  @Column({
    type: 'enum',
    enum: ['pendente', 'aceita', 'recusada', 'concluída'],
    default: 'pendente',
  })
  status: string;

  @ApiProperty() 
  @Column({ type: 'varchar', length: 255 })
  solicitante_email: string;
  
  @ApiProperty() 
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  valor_proposto: number;
  
  //   @ManyToOne(() => CoverageArea, (area) => area.demandas, {
  //     onDelete: 'CASCADE',
  //   })
  //   area_cobertura: CoverageArea;
  
  //   @ManyToOne(() => Offering, (offering) => offering.demandas, {
  //     onDelete: 'CASCADE',
  //   })
  //   servico: Offering;

  @ApiProperty({type: ()=> Provider}) 
  @ManyToOne(() => Provider, (provider) => provider.request, {
         onDelete: 'CASCADE',
       })
       provider: Provider;
}