export type TGeneratorPrismaResult = {
  user: {
    id: string;
    email: string;
    password: string;
    phone: string;
    name: string
  };
} & {
  id: string;
  document: string;
  birthDate: Date;
  user_id: string;
}
