import { Enterprise } from "../../domain/entities/enterprise.entity";
import { User } from "../../domain/entities/user.entity";
import { left } from "../../domain/shared/result/left.result";
import { Response } from "../../domain/shared/result/response.result";
import { right } from "../../domain/shared/result/right.result";
import { Address } from "../../domain/value-objects/address.value-object";
import { Phone } from "../../domain/value-objects/phone.value-object";
import { TEnterpriseInputDTO } from "../dto/input/enterprise.dto.input";
import { userFactory } from "./user.factory";

export const enterpriseFactory = (enterprise: TEnterpriseInputDTO): Response<Enterprise> => {
  const address = Address.create(enterprise.address)
  if (address.isFailure) return left(address);

  const user = userFactory({
    email: enterprise.email,
    name: enterprise.commercialName,
    password: enterprise.password,
    phone: enterprise.phone
  });
  if (!user.isRight()) return left(user.value)


  const entity = Enterprise.create({
    address: address.getValue(),
    user: user.value.getValue(),
    commercialName: enterprise.commercialName,
    companyName: enterprise.companyName,
    document: enterprise.document
  })
  if (entity.isFailure) return left(entity);
  return right(entity);
}
