import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { CatsController } from './controllers/cats.controller';
import { CatsRepository } from './cats.repository';
import { Cat, CatSchema } from './cats.schema';
import { CatsService } from './services/cats.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { MulterModule } from '@nestjs/platform-express';
import { Comments, CommentsScheme } from 'src/comments/comments.schema';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    MongooseModule.forFeature([
      { name: Comments.name, schema: CommentsScheme },
      { name: Cat.name, schema: CatSchema },
    ]),
  ],
  controllers: [CatsController],
  providers: [
    CatsService,
    CatsRepository,
    JwtService,
    AuthService,
    JwtAuthGuard,
    JwtStrategy,
  ],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
