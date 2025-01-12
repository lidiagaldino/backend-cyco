import { Enterprise } from "../../../domain/entities/enterprise.entity";
import { TEnterpriseOutputDTO } from "../../dto/output/enterprise.dto.output";

export const mapEnterpriseOutput = (enterprise: Enterprise): TEnterpriseOutputDTO => {
  return {
    id: enterprise.getId(),
    address: {
      complement: enterprise.getAddress().getComplement(),
      number: enterprise.getAddress().getNumber(),
      zipCode: enterprise.getAddress().getZipCode()
    },
    commercialName: enterprise.getCommercialName(),
    companyName: enterprise.getCompanyName(),
    document: enterprise.getDocument(),
    email: enterprise.getUser().getEmail(),
    phone: {
      ddd: enterprise.getUser().getPhone().getDdd(),
      ddi: enterprise.getUser().getPhone().getDdi(),
      number: enterprise.getUser().getPhone().getNumber()
    }
  }
}
