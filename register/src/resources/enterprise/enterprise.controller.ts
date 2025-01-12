import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateEnterpriseUsecase } from '../../@core/application/usecases/enterprise/create-enterprise.usecase';
import { TEnterpriseInputDTO } from '../../@core/application/dto/input/enterprise.dto.input';
import { FindEnterpriseByIdUsecase } from '../../@core/application/usecases/enterprise/find-enterprise-by-id.usecase';

@Controller('enterprise')
export class EnterpriseController {
  constructor(
    private readonly createUsecase: CreateEnterpriseUsecase,
    private readonly findByIdUsecase: FindEnterpriseByIdUsecase
  ) { }

  @Post()
  create(@Body() createEnterpriseDto: TEnterpriseInputDTO) {
    return this.createUsecase.execute(createEnterpriseDto);
  }

  // @Get()
  // findAll() {
  //   return this.enterpriseService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findByIdUsecase.execute(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEnterpriseDto: UpdateEnterpriseDto) {
  //   return this.enterpriseService.update(+id, updateEnterpriseDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.enterpriseService.remove(+id);
  // }
}
