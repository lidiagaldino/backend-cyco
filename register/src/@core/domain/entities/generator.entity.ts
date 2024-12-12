import { Guard } from "../shared/guard/guard"
import { Result } from "../shared/result/result"
import { User } from "./user.entity"

export type TGenerator = {
  birthDate: Date,
  document: string, //create document value object (cpf or cnpj)
  user: User
}

export class Generator {
  private id: number
  private props: TGenerator

  private constructor(props: TGenerator) {
    this.props = props
  }

  public static create(generator: TGenerator) {
    const guardResults = Guard.combine([
      Guard.againstNullOrUndefined(generator.birthDate, 'birthDate'),
      Guard.againstNullOrUndefined(generator.document, 'document'),
      Guard.againstNullOrUndefined(generator.user, 'user'),
    ])

    if (guardResults.isFailure) {
      return Result.fail<Generator>(guardResults.getErrorValue());
    }

    return Result.ok<Generator>(new Generator(generator));
  }

  public getId() {
    return this.id
  }

  public getBirthDate() {
    return this.props.birthDate
  }

  public getDocument() {
    return this.props.document
  }

  public getUser() {
    return this.props.user
  }

  public setDocument(document: string) {
    this.props.document = document
  }

  public setBirthDate(birthDate: Date) {
    this.props.birthDate = birthDate
  }

  public setUser(user: User) {
    this.props.user = user
  }
}
