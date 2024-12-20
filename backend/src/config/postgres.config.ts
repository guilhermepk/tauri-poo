import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService {
    constructor(
        private configService: ConfigService
    ) { }
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
            synchronize: true,
            // logging: true,
            // logger: 'advanced-console',
            autoLoadEntities: true,
            // entities: [],
            schema: this.configService.get<string>('DB_SCHEMA'),
        }
    }
}