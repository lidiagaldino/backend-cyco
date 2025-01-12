import { Test, TestingModule } from '@nestjs/testing';
import { EnterpriseController } from './enterprise.controller';
import { TEnterpriseInputDTO } from '../../@core/application/dto/input/enterprise.dto.input';
import { CreateEnterpriseUsecase } from '../../@core/application/usecases/enterprise/create-enterprise.usecase';
import { FindEnterpriseByIdUsecase } from '../../@core/application/usecases/enterprise/find-enterprise-by-id.usecase';
import { IEnterpriseRepository } from '../../@core/domain/repositories/enterprise.repository';
import { IPasswordCryptography } from '../../@core/domain/services/password-cryptography.service';
import { IValidator } from '../../@core/domain/services/validator.service';
import { BcryptAdapter } from '../../infra/cryptography/password/bcrypt.adapter';
import { prismaClient } from '../../infra/db/prisma';
import { EnterpriseRepositoryImpl } from '../../infra/db/prisma/repositories/enterprise.prisma-repository';
import { enterpriseSchema } from '../../infra/validation/yup/schemas/enterprise.schema';
import { YupAdapter } from '../../infra/validation/yup/yup.adapter';

describe('EnterpriseController', () => {
  let controller: EnterpriseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    controller = module.get<EnterpriseController>(EnterpriseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
