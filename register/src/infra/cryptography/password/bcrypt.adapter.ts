
import * as bcrypt from 'bcryptjs';
import { IPasswordCryptography } from '../../../@core/domain/services/password-cryptography.service';

export class BcryptAdapter implements IPasswordCryptography {
  constructor(private readonly salt: number) { }

  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.salt);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
