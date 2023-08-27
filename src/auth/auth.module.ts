import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Module, forwardRef } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { CatsModule } from 'src/cats/cats.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1y' },
    }),

    // 순환 참조 이슈를 막기 위해 사용한다.
    forwardRef(() => CatsModule),
  ],
  providers: [AuthService, JwtService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
