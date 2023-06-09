import { AppResolver } from './app.resolver';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';

import { APP_FILTER } from "@nestjs/core";
import { ExceptionsLoggerFilter } from "./errorHandler.helper";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver,{
    provide: APP_FILTER,
    useClass: ExceptionsLoggerFilter,
  }],
})
export class AppModule {}
