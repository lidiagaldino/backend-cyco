import { Enterprise } from "../../../domain/entities/enterprise.entity";
import { TEnterpriseOutputDTO } from "../../dto/output/enterprise.dto.output";

export const mapEnterpriseOutput = (enterprise: Enterprise): TEnterpriseOutputDTO => {
  return {
    id: enterprise.getId(),
    address: {
      address: enterprise.getAddress().getAddress(),
      city: enterprise.getAddress().getCity(),
      complement: enterprise.getAddress().getComplement(),
      neighborhood: enterprise.getAddress().getNeighborhood(),
      number: enterprise.getAddress().getNumber(),
      uf: enterprise.getAddress().getUf(),
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
