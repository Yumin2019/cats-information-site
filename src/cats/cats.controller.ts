import {
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
  getAllCat() {
    // throw new HttpException('api broken', 401);
    console.log('hello world');
    console.log('hello world');
    console.log('hello world');
    return 'asdsdsdsdsll cat';
  }

  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe) param): string {
    console.log(param);
    return 'get one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updatePartialCat() {
    return 'update partial cat';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete cat';
  }
}
