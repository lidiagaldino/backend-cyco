import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateDeliverymanUsecase } from '../../@core/application/usecases/deliveryman/create-deliveryman.usecase';
import { TDeliverymanInputDTO } from '../../@core/application/dto/input/deliveryman.dto.input';

@Controller('deliveryman')
export class DeliverymanController {
  constructor(private readonly createUsecase: CreateDeliverymanUsecase) { }

  @Post()
  create(@Body() createDeliverymanDto: TDeliverymanInputDTO) {
    return this.createUsecase.execute(createDeliverymanDto);
  }

  // @Get()
  // findAll() {
  //   return this.deliverymanService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.deliverymanService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDeliverymanDto: UpdateDeliverymanDto) {
  //   return this.deliverymanService.update(+id, updateDeliverymanDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.deliverymanService.remove(+id);
  // }
}
