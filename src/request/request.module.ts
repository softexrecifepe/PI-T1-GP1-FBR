import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RequestService } from "./services/request.service";
import { RequestController } from "./controllers/request.controller";
import { ProviderModule } from "../provider/provider.module";
import { ProviderService } from "../provider/services/provider.service";

@Module({
    imports: [TypeOrmModule.forFeature([Request]), ProviderModule],
    providers: [RequestService, ProviderService],
    controllers: [RequestController],
    exports: [TypeOrmModule],
})

export class RequestModule {}