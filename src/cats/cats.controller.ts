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
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SucessInterceptor } from 'src/common/interceptors/success.intercepter';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SucessInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getCurrentCat() {
    return 'getCurrentCat';
  }

  @Post()
  async signUp(@Body() body) {
    console.log(body);
    console.log(process.env.MODE);
    console.log(process.env.MONGODB_URL);

    return 'signup';
  }

  @Post('login')
  login() {
    return 'login';
  }

  @Post('logout')
  logout() {
    return 'logout';
  }

  @Post('upload/cats')
  uploadCatImage() {
    return 'uploadCatImage';
  }
}
