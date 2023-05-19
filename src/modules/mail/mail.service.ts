import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { IMailOptions } from '@common/interfaces/mailoptions.interface';
import { PoolService } from '@modules/pool/pool.service';
import { join } from 'path';
import { MailerService } from '@nestjs-modules/mailer';

var hbs = require('nodemailer-express-handlebars');

@Injectable()
export class MailService {

  constructor(private poolService: PoolService) { }


  async sendMailResetPassword(correo: string) {

    // Step 1
    let transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'jhonnguashpa42@gmail.com',
        pass: 'gdkgprshxtqvpvka',
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    // Step 2
    transporter.use('compile', hbs({
      viewEngine: {
        extname: '.hbs', // handlebars extension
        layoutsDir: join(__dirname, 'templates/layouts'), // location of handlebars templates
        partialsDir: join(__dirname, 'templates'), // location of your subtemplates aka. header, footer etc
      },
      viewPath: join(__dirname, 'templates'),
      extName: '.hbs'
    }));

    // Step 3
    let mailOptions = {
      from: '"Coordinacion Zonal 3 - Salud" <support@coorcz3.com>', // TODO: email sender
      to: correo, // TODO: email receiver
      subject: 'Reset your password',
      template: 'resetpassword',
      context: {
        name: 'usuario',
        password: 'password',
        date: 2023
      }
    };

    // Step 4
    await transporter.sendMail(mailOptions).then(res => {
      console.log('Send mail');
    }).catch(err => {
      throw 'error=>'+err;
    });
  }






 
  async sendMailTemporaryPassword(name: string, username: string, password: string, correo: string){
    const anio = new Date().getFullYear();

    let mailOptions = {
      to: correo,
      subject: 'Temporal Password',
      template: 'temporary-password',
      context: {
        name: name,
        username: username,
        password: password,
        date: anio
      } 
    };
    try {
      return await this.sendMailSystem(mailOptions)
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(username: string, correo: string, link: string){
    let mailOptions = {
      to: correo,
      subject: 'Reset your password',
      template: 'resetpassword',
      context: {
        name: username,
        date: 2022,
        link: link
      } 
    };

    try {
      await this.sendMailSystem(mailOptions)
      return true;
    } catch (error) {
      throw error;
    }
  }

  async sendMailSystem(mailOptions: IMailOptions){
    console.log('entro a sendMailSystem');
    const email = await this.getNotificationMailSystem();
    if(email.length <= 0){
      throw 'No tiene configurado un servidor de correo para notificaciones del sistema';
    }
    let transporter = this.createServerMail(email[0].smtp_segcorr,email[0].puerto_segcorr,email[0].usuario_segcorr,email[0].clave_segcorr);
    transporter.use('compile', hbs(this.optionsTemplate()));
    mailOptions.from = `"Coordinación Zonal 3 - Salud" <${email[0].correo_segcorr}>`;
    return transporter.sendMail(mailOptions);
  }


  /**
   * Retorna un transporte generado
   * @param host 
   * @param port 
   * @param username 
   * @param password 
   * @returns 
   */
  createServerMail(host: string, port: number, username: string, password: string){
    return createTransport({
      host: host,
      port: port,
      //secure: true,
      auth: {
        user: username,
        pass: password,
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: true,
      },
    });
  }


  /**
   * Opciones para las plantillas
   * @returns 
   */
  private optionsTemplate() {
    return {
      viewEngine: {
        extname: '.hbs', // handlebars extension
        layoutsDir: join(__dirname, 'templates/layouts'), // location of handlebars templates
        partialsDir: join(__dirname, 'templates'), // location of your subtemplates aka. header, footer etc
      },
      viewPath: join(__dirname, 'templates'),
      extName: '.hbs'
    }
  }


  /**
   * Retorna datos del servidor de correo para notificaciones del sistema
   * @returns 
   */
  private async getNotificationMailSystem() {
    const query = `select smtp_segcorr,puerto_segcorr,usuario_segcorr,correo_segcorr,clave_segcorr,smtpsecure_segcorr
    from seg_correo 
    where activo_segcorr=true limit 1`;
    return await this.poolService.consult(query);
  }

}
