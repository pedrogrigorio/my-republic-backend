import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { isPublic } from './core/decorators/is-public.decorator';

@Controller()
export class AppControler {
  constructor() {}

  @isPublic()
  @Get('pictures/:filename')
  async getPicture(@Param('filename') filename: string, @Res() res: Response) {
    res.sendFile(filename, { root: './uploads' });
  }
}
