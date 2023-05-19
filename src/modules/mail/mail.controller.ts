import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Mail')
@Controller('mail')
export class MailController {

  constructor(private readonly mailService: MailService) {}

  @Post('send_mail/:correo')
  sendEmail(@Param('correo') correo: string){
    return this.mailService.sendMailResetPassword(correo);
  }

}
