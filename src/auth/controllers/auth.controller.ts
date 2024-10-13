import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { UserLogin } from '../entites/userlogin.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller("/user")
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/logar')
    async login(@Body() user: UserLogin): Promise<any> {
        return this.authService.login(user);
    }

}