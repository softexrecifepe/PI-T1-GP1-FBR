import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { User } from "../../user/entities/user.entity";
import { CoverageArea } from "../../coverageArea/entities/coverageArea.entity";
import { Offering } from "../../offering/entities/offering.entity";
import { Infrastructure } from "../../infrastructure/entities/infrastructure.entity";
import { Provider } from "../../provider/entities/provider.entity";
import { Request } from "../../request/entites/request.entity";


@Injectable()
export class DevService implements TypeOrmOptionsFactory {

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'db_fbr_digital',
            entities: [User, CoverageArea, Offering, Provider, Infrastructure, Request],
            synchronize: true,
    };
  }
}