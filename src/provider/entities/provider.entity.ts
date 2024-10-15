import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Offering } from "../../offering/entities/offering.entity"
import { Infrastructure } from "../../infrastructure/entities/infrastructure.entity"

@Entity({name: "tb_provider"})
export class Provider {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    cnpj: string

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    fantasy_name: string

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    corporate_name: string

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    headquarters_adress: string

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    legal_representative_contact: string

    @ApiProperty()
    @OneToMany(() => Offering, (offering) => offering.provider)
    offering: Offering[]

    @ApiProperty()
    @OneToMany(() => Infrastructure, (infrastructure) => infrastructure.provider)
    infrastructure: Infrastructure[]
}