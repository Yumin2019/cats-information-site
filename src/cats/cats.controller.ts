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
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SucessInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getCurrentCat() {
    return 'getCurrentCat';
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
