import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: "tb_users"})
export class User {

    @ApiProperty()
    @PrimaryGeneratedColumn() 
    id: number

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    nome: string

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({example: "email@email.com.br"}) 
    @Column({length: 255, nullable: false })
    usuario: string

    @ApiProperty()
    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false }) 
    senha: string

    @ApiProperty()
    @Column({length: 5000 }) 
    foto: string

}