import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    return { user: user.username };
  }

  async validateOtp(username: string, otpCode: string): Promise<any> {
    console.log('otp');
    const user = await this.usersService.findOne(username);
    const validateOtp = [];
    for (let i = -1; i < 2; i++) {
      validateOtp.push(
        this.generateOtpCode(
          user.secret,
          Math.floor(Math.floor(new Date().getTime() / 1000) / 30) + i,
        ),
      );
    }
    for (const otp of validateOtp) {
      if (otp === otpCode) {
        const payload = { username: user.username, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    }
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  generateOtpCode(secret: string, time: number): string {
    const hmac = crypto
      .createHmac('sha1', secret)
      .update(time.toString(10))
      .digest();
    const lastByte = hmac[19];
    const offset = lastByte & 0xf;
    let binCode = (
      (((hmac[offset] & 0x7f) << 24) |
        ((hmac[offset + 1] & 0xff) << 16) |
        ((hmac[offset + 2] & 0xff) << 8) |
        (hmac[offset + 3] & 0xff)) %
      1000000
    ).toString(10);
    if (binCode.length < 6) {
      for (let i = binCode.length; i < 6; i++) {
        binCode = '0' + binCode;
      }
    }
    return binCode;
  }
}
