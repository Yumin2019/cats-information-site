import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey', // 유출되면 안 되는 정보이다. 환경 변수로 저장
      ignoreExpiration: false, // jwt 만료기간
    });
  }

  //   async validate(payload) {

  //   }
}
