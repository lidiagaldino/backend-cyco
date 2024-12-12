export type TGeneratorOutputDTO = {
  id: number
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
