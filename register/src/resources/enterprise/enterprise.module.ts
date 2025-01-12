import { Module } from '@nestjs/common';
import { EnterpriseController } from './enterprise.controller';
import { YupAdapter } from '../../infra/validation/yup/yup.adapter';
import { EnterpriseRepositoryImpl } from '../../infra/db/prisma/repositories/enterprise.prisma-repository';
import { prismaClient } from '../../infra/db/prisma';
import { BcryptAdapter } from '../../infra/cryptography/password/bcrypt.adapter';
import { CreateEnterpriseUsecase } from '../../@core/application/usecases/enterprise/create-enterprise.usecase';
import { IEnterpriseRepository } from '../../@core/domain/repositories/enterprise.repository';
import { TEnterpriseInputDTO } from '../../@core/application/dto/input/enterprise.dto.input';
import { enterpriseSchema } from '../../infra/validation/yup/schemas/enterprise.schema';
import { IPasswordCryptography } from '../../@core/domain/services/password-cryptography.service';
import { IValidator } from '../../@core/domain/services/validator.service';
import { FindEnterpriseByIdUsecase } from '../../@core/application/usecases/enterprise/find-enterprise-by-id.usecase';

@Module({
  controllers: [EnterpriseController],
  providers: [
    { provide: YupAdapter, useClass: YupAdapter },
    { provide: EnterpriseRepositoryImpl, useFactory: () => new EnterpriseRepositoryImpl(prismaClient) },
    { provide: BcryptAdapter, useFactory: () => new BcryptAdapter(8) },
    {
      provide: CreateEnterpriseUsecase,
      useFactory: (
        repository: IEnterpriseRepository,
        passwordCryptography: IPasswordCryptography,
        validator: IValidator<TEnterpriseInputDTO>
      ) => new CreateEnterpriseUsecase(
        repository,
        passwordCryptography,
        validator,
        enterpriseSchema
      ),
      inject: [EnterpriseRepositoryImpl, BcryptAdapter, YupAdapter]
    },
    {
      provide: FindEnterpriseByIdUsecase,
      useFactory: (
        repository: IEnterpriseRepository
      ) => new FindEnterpriseByIdUsecase(
        repository
      ),
      inject: [EnterpriseRepositoryImpl]
    }
  ],
})
export class EnterpriseModule { }
