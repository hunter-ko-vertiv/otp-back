import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

@Injectable()
export class OtpStrategy extends PassportStrategy(Strategy, 'otp') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(username: string, otpCode: string): Promise<any> {
    const user = await this.authService.validateOtp(username, otpCode);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
