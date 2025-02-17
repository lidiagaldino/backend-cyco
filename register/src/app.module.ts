import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeneratorModule } from './resources/generator/generator.module';
import { DeliverymanModule } from './resources/deliveryman/deliveryman.module';
import { APP_FILTER } from '@nestjs/core';
import { PrismaClientExceptionFilter } from './infra/error/prisma-client.exception-filter';
import { VehicleModule } from './resources/vehicle/vehicle.module';
import { EnterpriseModule } from './resources/enterprise/enterprise.module';

@Module({
  imports: [GeneratorModule, DeliverymanModule, VehicleModule, EnterpriseModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
  ],
})
export class AppModule { }
