import { CatsRepository } from 'src/cats/cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, // 유출되면 안 되는 정보이다. 환경 변수로 저장
      ignoreExpiration: false, // jwt 만료기간
    });
  }

  async validate(payload: Payload) {
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub,
    );

    if (cat) {
      return cat;
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}

class Payload {
  email: string;
  sub: string;
}
