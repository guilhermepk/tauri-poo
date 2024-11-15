import { Controller, Get } from "@nestjs/common";

@Controller('users')
export class UsersController {
    @Get('teste')
    async teste(){
        return 'Testado com sucesso';
    }
}