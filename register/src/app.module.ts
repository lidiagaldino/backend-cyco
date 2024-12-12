import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeneratorModule } from './resources/generator/generator.module';
import { DeliverymanModule } from './resources/deliveryman/deliveryman.module';

@Module({
  imports: [GeneratorModule, DeliverymanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
