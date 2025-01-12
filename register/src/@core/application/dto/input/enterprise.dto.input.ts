export type TEnterpriseInputDTO = {
  email: string;
  password: string;
  phone: {
    ddd: number;
    ddi: number;
    number: string;
  };
  address: {
    zipCode: string;
    address: string;
    uf: string;
    city: string;
    neighborhood: string;
    number: string;
    complement: string;
  }
  document: string;
  commercialName: string;
  companyName: string;
}
