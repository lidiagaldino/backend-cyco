import { Generator } from "../entities/generator.entity";

export interface IGeneratorRepository {
  create(generator: Generator): Promise<Generator>
}
