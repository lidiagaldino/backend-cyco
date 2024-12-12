import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateGeneratorUsecase } from '../../@core/application/usecases/generator/create-generator.usecase';
import { TGeneratorInputDTO } from '../../@core/application/dto/input/generator.dto.input';

@Controller('generator')
export class GeneratorController {
  constructor(private readonly createUser: CreateGeneratorUsecase) { }

  @Post()
  create(@Body() createGeneratorDto: TGeneratorInputDTO) {
    return this.createUser.execute(createGeneratorDto);
  }

  // @Get()
  // findAll() {
  //   return this.generatorService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.generatorService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGeneratorDto: UpdateGeneratorDto) {
  //   return this.generatorService.update(+id, updateGeneratorDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.generatorService.remove(+id);
  // }
}
