import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { OtpAuthGuard } from './auth/otp.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('/v1/auth/login')
  async login(@Request() req) {
    console.log('login');
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/v1/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('/v1/auth/twoFactorValidate')
  async validateOtp(@Req() req) {
    console.log(req.body);
    return this.authService.validateOtp(req.body.username, req.body.otpCode);
  }
}
