import { UnprocessableEntityException } from "@nestjs/common";
import { IPasswordCryptography } from "../../../domain/services/password-cryptography.service";
import { IValidator } from "../../../domain/services/validator.service";
import { Password } from "../../../domain/value-objects/password.value-object";
import { IEnterpriseRepository } from "../../../domain/repositories/enterprise.repository";
import { TEnterpriseInputDTO } from "../../dto/input/enterprise.dto.input";
import { TEnterpriseOutputDTO } from "../../dto/output/enterprise.dto.output";
import { enterpriseFactory } from "../../factories/enterprise.factory";
import { mapEnterpriseOutput } from "./map";

export class CreateEnterpriseUsecase {
  constructor(
    private readonly enterpriseRepository: IEnterpriseRepository,
    private readonly passwordCryptography: IPasswordCryptography,
    private readonly validator: IValidator<TEnterpriseInputDTO>,
    private readonly schema: object
  ) { }

  async execute(input: TEnterpriseInputDTO): Promise<TEnterpriseOutputDTO> {
    const { isValid, errorsResult } = this.validator.validate(this.schema, input)
    if (!isValid) throw new UnprocessableEntityException(errorsResult);

    const enterprise = enterpriseFactory(input)
    if (!enterprise.isRight()) throw new UnprocessableEntityException(enterprise.value.getErrorValue())

    const hashedPassword = await this.passwordCryptography.hash(input.password)
    const password = Password.create({ password: hashedPassword }).getValue()
    const enterpriseValue = enterprise.value.getValue()
    enterpriseValue.getUser().setPassword(password)

    const result = await this.enterpriseRepository.create(enterpriseValue)
    return mapEnterpriseOutput(result);
  }
}
