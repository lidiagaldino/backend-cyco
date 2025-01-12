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
    number: string;
    complement: string;
  }
  document: string;
  commercialName: string;
  companyName: string;
}
