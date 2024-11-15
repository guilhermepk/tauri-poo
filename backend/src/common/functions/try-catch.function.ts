import { HttpException, InternalServerErrorException } from "@nestjs/common";

function handleError(error, alternativeMessage: string){
    throw error instanceof HttpException
    ? error
    : new InternalServerErrorException(`${alternativeMessage}. ${error}`);
}

export async function tryCatch(
    callBack: () => any,
    alternativeMessage: string
){
    try {
        return await callBack();
    } catch (error) {
        handleError(error, alternativeMessage);
    }
}