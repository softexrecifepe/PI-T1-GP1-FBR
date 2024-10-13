import { ApiProperty } from "@nestjs/swagger"

export class UserLogin {

    @ApiProperty() 
    public usuario: string

    @ApiProperty() 
    public senha: string

}