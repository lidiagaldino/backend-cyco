export type TGeneratorOutputDTO = {
  id: string
  email: string;
  name: string;
  phone: {
    ddd: number;
    ddi: number;
    number: string;
  };
  birthDate: Date;
  document: string;
}
