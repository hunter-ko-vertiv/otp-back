import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
@Injectable()
export class CryptoUtilsService {
  async hashPassWord(password) {
    const saltRound = 10;
    return bcrypt.hash(password, saltRound);
  }

  async compare(password, hash) {
    return bcrypt.compare(password, hash);
  }

  async creatShareKey(): Promise<Buffer> {
    return crypto.randomBytes(48);
  }
}
