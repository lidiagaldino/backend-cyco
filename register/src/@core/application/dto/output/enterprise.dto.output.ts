export type TEnterpriseOutputDTO = {
  id: string
  email: string;
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
