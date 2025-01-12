import { NotFoundException } from "@nestjs/common";
import { mapEnterpriseOutput } from "./map";
import { IEnterpriseRepository } from "../../../domain/repositories/enterprise.repository";
import { TEnterpriseOutputDTO } from "../../dto/output/enterprise.dto.output";

export class FindEnterpriseByIdUsecase {
  constructor(
    private readonly enterpriseRepository: IEnterpriseRepository
  ) { }

  async execute(id: string): Promise<TEnterpriseOutputDTO> {
    const result = await this.enterpriseRepository.findById(id)
    if (!result) throw new NotFoundException("ENTERPRISE_NOT_FOUND")
    return mapEnterpriseOutput(result)
  }
}
