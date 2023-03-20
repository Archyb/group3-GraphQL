import { GqlArgumentsHost, GqlExceptionFilter } from "@nestjs/graphql";
import { ApolloError } from "apollo-server-express";
import { Catch } from "@nestjs/common";


@Catch(ApolloError)
export class GraphqlExceptionFilter implements GqlExceptionFilter {
  catch(exception: ApolloError, host: GqlArgumentsHost) {
    const info = host.getInfo();
    const statusCode = exception.extensions?.exception?.response?.statusCode;

    return {
      "errors": {
        "sendProducts": {
          "errors": [
            {
              "gtin": exception.extensions?.exception?.response?.message ,
              "property":exception.path[0],
              "problem": "problem",
              "message": ""
            }],
          "status": statusCode
        }
      }
    }
  }
}
