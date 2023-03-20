import { Catch, ArgumentsHost, ExceptionFilter, HttpException, BadRequestException } from "@nestjs/common";
import { Request, Response } from "express";
import { BaseExceptionFilter } from "@nestjs/core";
import { error } from "console";

@Catch(BadRequestException)
export class ExceptionsLoggerFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;
    interface IError {
      "errors": {
        "sendProducts": {
          "errors": [
            { "gtin": "0", "property": Request, "problem": "error", "message": string }],
          "status": number
        }

      };
    }
    const errorResponse: IError = {
      "errors": {
        "sendProducts": {
          "errors": [
            {
              "gtin": "0",
              "property": request,
              "problem": "error",
              "message": message
            }],
          "status": status
        }
      }
    };

    return JSON.stringify(errorResponse);
  }
}
