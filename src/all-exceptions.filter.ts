import { Catch, ArgumentsHost, HttpStatus, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Response, Request } from "express";
import { MyLoggerService } from "./my-logger/my-logger.service";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";



type MyResponse = {
    statusCode: number;
    timestamp: string;
    path: string;
    response: string | object
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new MyLoggerService(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const message = (exception instanceof HttpException) ? exception.message : (exception instanceof PrismaClientValidationError ? 'Validation Error' : 'Internal Server Error');
        const status = (exception instanceof HttpException) ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorResponse: MyResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            response: message
        }

        this.logger.error(`Http Status: ${status}, Error Message: ${JSON.stringify(errorResponse)}`);

        response.status(status).json(errorResponse);
    }
}