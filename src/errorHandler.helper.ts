
import { Catch, ArgumentsHost, ExceptionFilter, HttpException, BadRequestException } from "@nestjs/common";
import { Request, Response } from 'express';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(BadRequestException)
export class ExceptionsLoggerFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message ;

    response
      .status(status)
      .json({
        "errors": {
          "sendProducts": {
            "errors": [
              {
                "gtin": "0",
                "property": "",
                "problem": "problem",
                "message": message
              }],
            "status": 400
          }
        }
      });
  }
}
