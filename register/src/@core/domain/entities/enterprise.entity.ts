import { Guard } from "../shared/guard/guard";
import { Result } from "../shared/result/result";
import { Address } from "../value-objects/address.value-object";
import { User } from "./user.entity"

export type TEnterpriseProps = {
  user: User;
  commercialName: string;
  companyName: string;
  document: string; //todo: create value-object
  address: Address;
}


export class Enterprise {
  private id: string
  private props: TEnterpriseProps

  private constructor(props: TEnterpriseProps) {
    this.props = props
  }

  public static create(enterprise: TEnterpriseProps) {
    const guardResults = Guard.combine([
      Guard.againstNullOrUndefined(enterprise.document, 'document'),
      Guard.againstNullOrUndefined(enterprise.commercialName, 'commercialName'),
      Guard.againstNullOrUndefined(enterprise.companyName, '.companyName'),
      Guard.againstNullOrUndefined(enterprise.address, 'address'),
      Guard.againstNullOrUndefined(enterprise.user, 'user'),
    ])

    if (guardResults.isFailure) {
      return Result.fail<Enterprise>(guardResults.getErrorValue());
    }

    return Result.ok<Enterprise>(new Enterprise(enterprise));
  }

  public getId() {
    return this.id
  }

  public getDocument() {
    return this.props.document
  }

  public getUser() {
    return this.props.user
  }

  public getCommercialName() {
    return this.props.commercialName
  }

  public getCompanyName() {
    return this.props.companyName
  }

  public getAddress() {
    return this.props.address
  }

  public setDocument(document: string) {
    this.props.document = document
  }

  public setUser(user: User) {
    this.props.user = user
  }

  public setCommercialName(commercialName: string) {
    this.props.commercialName = commercialName
  }

  public setCompanyName(companyName: string) {
    this.props.companyName = companyName
  }

  public setAddress(address: Address) {
    this.props.address = address
  }

  public setId(id: string) {
    this.id = id
  }
}
