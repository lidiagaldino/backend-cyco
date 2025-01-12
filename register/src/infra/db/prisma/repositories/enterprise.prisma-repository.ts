import { PrismaClient } from "@prisma/client";
import { Enterprise } from "../../../../@core/domain/entities/enterprise.entity";
import { IEnterpriseRepository } from "../../../../@core/domain/repositories/enterprise.repository";
import { TEnterprisePrismaResult } from "./types/enterprise-prisma-types";
import { User } from "../../../../@core/domain/entities/user.entity";
import { Password } from "../../../../@core/domain/value-objects/password.value-object";
import { Phone } from "../../../../@core/domain/value-objects/phone.value-object";
import { Address } from "../../../../@core/domain/value-objects/address.value-object";

export class EnterpriseRepositoryImpl implements IEnterpriseRepository {

  constructor(
    private readonly prisma: PrismaClient
  ) { }

  async create(enterprise: Enterprise): Promise<Enterprise> {
    const address = await this.prisma.tbl_address.upsert({
      where: { zipCode: enterprise.getAddress().getZipCode() },
      create: {
        zipCode: enterprise.getAddress().getZipCode()
      },
      update: {}
    })

    const result = await this.prisma.tbl_enterprise.create({
      data: {
        commercialName: enterprise.getCommercialName(),
        companyName: enterprise.getCompanyName(),
        document: enterprise.getDocument(),
        user: {
          create: {
            email: enterprise.getUser().getEmail(),
            name: enterprise.getUser().getName(),
            password: enterprise.getUser().getPassword().getPassword(),
            phone: enterprise.getUser().getPhone().getPhone()
          }
        },
        tbl_enterprise_address: {
          create: {
            complement: enterprise.getAddress().getComplement(),
            number: enterprise.getAddress().getNumber(),
            address: {
              connect: { id: address.id }
            }
          }
        }
      },
      include: {
        user: true,
        tbl_enterprise_address: {
          include: {
            address: true
          }
        }
      }
    })
    enterprise.setId(result.id)
    return enterprise
  }

  async findById(id: string): Promise<Enterprise> {
    const result = await this.prisma.tbl_enterprise.findUnique({
      where: { id },
      include: {
        user: true,
        tbl_enterprise_address: {
          include: {
            address: true
          }
        }
      }
    })

    return result ? this.mapOutput(result) : null
  }

  private mapOutput(result: TEnterprisePrismaResult): Enterprise {
    const password = Password.create({ password: result.user.password }).getValue()
    const phone = Phone.createFromString(result.user.phone).getValue()
    const user = User.create({
      name: result.user.name,
      phone: phone,
      email: result.user.email,
      password: password
    }).getValue()
    user.setId(result.user_id);

    const address = Address.create({
      complement: result.tbl_enterprise_address[0].complement,
      number: result.tbl_enterprise_address[0].number,
      zipCode: result.tbl_enterprise_address[0].address.zipCode
    }).getValue()

    const enterprise = Enterprise.create({
      address,
      user,
      commercialName: result.commercialName,
      companyName: result.companyName,
      document: result.document
    }).getValue()
    enterprise.setId(result.id)
    return enterprise
  }
}
