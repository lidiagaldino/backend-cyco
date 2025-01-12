import { Guard } from '../shared/guard/guard';
import { Result } from '../shared/result/result';

export type TAddressProps = {
  city: string;
  uf: string;
  zipCode: string;
  neighborhood: string;
  address: string;
  number: string;
  complement: string;
};

/**
 * A class representing a Address.
 */
export class Address {
  private props: TAddressProps;

  /**
   * Private constructor for creating a Address instance.
   * @param props - The properties of the address.
   */
  private constructor(props: TAddressProps) {
    this.props = props;
  }


  /**
   * Creates a new Address instance.
   * @param props - The properties of the address.
   * @returns A Result object containing the created Address instance or an error.
   */
  public static create(address: TAddressProps): Result<Address> {
    const guardResults = Guard.combine([
      Guard.againstNullOrUndefined(address.city, 'city'),
      Guard.againstNullOrUndefined(address.uf, 'uf'),
      Guard.againstNullOrUndefined(address.zipCode, 'zipCode'),
      Guard.againstNullOrUndefined(address.address, 'address'),
      Guard.againstNullOrUndefined(address.number, 'number'),
      Guard.againstNullOrUndefined(address.complement, 'complement'),
      Guard.againstNullOrUndefined(address.neighborhood, 'neighborhood'),
      Guard.againstAtLeast(2, address?.city),
      Guard.againstAtLeast(2, address?.uf),
      Guard.againstAtMost(2, address?.uf),
    ]);
    if (guardResults.isFailure)
      return Result.fail<Address>(guardResults.getErrorValue());

    return Result.ok<Address>(new Address(address));
  }

  /**
   * Gets the UF of the address.
   * @returns The UF of the address.
   */
  getUf() {
    return this.props.uf;
  }

  /**
   * Gets the City of the address.
   * @returns The City of the Address.
   */
  getCity() {
    return this.props.city;
  }

  /**
   * Gets the street of the address.
   * @returns The street of the Address.
   */
  getAddress() {
    return this.props.address;
  }

  /**
   * Gets the zipcode of the address.
   * @returns The zipcode of the Address.
   */
  getZipCode() {
    return this.props.zipCode;
  }

  /**
   * Gets the number of the address.
   * @returns The number of the Address.
   */
  getNumber() {
    return this.props.number;
  }

  /**
   * Gets the complement of the address.
   * @returns The complement of the Address.
   */
  getComplement() {
    return this.props.complement;
  }

  /**
   * Gets the neighborhood of the address.
   * @returns The neighborhood of the Address.
   */
  getNeighborhood() {
    return this.props.neighborhood;
  }
}
