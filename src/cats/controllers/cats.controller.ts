import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from '../services/cats.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SucessInterceptor } from 'src/common/interceptors/success.intercepter';
import { CatRequestDto } from '../dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from '../dto/cat.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.option';
import { Cat } from '../cats.schema';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SucessInterceptor)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getCurrentCat(@CurrentUser() cat) {
    console.log(cat);
    return cat.readOnlyData;
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    console.log(body);
    console.log(process.env.MODE);
    console.log(process.env.MONGODB_URL);

    return await this.catsService.signUp(body);
  }

  @Post('login')
  login(@Body() body: LoginRequestDto) {
    console.log('body = ' + body);
    return this.authService.jwtLogIn(body);
  }

  @Post('logout')
  logout() {
    return 'logout';
  }

  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
  @Post('upload')
  @UseGuards(JwtAuthGuard)
  uploadCatImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() cat: Cat,
  ) {
    console.log('files = ' + files);
    // return { image: 'http://loalhost:8000/media/cats//${files[0].filename}' };
    return this.catsService.uploadImg(cat, files);
  }
}
