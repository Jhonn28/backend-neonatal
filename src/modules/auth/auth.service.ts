import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hash, hashSync } from 'bcrypt';
import { SecurityService } from '@modules/security/security.service';
import Utils from '@common/class/utils.class';
import { FALLO_INGRESO, INGRESO_USUARIO } from '@config/accion-audit.const';
import { IJwtPayload } from '@common/interfaces/payload.interface';
import { SignOutDto } from './dto/signout.dto';
import { MailService } from '../mail/mail.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { PoolService } from '@modules/pool/pool.service';
@Injectable()
export class AuthService {

    constructor(
        private readonly securityService: SecurityService,
        private readonly mailService: MailService,
        private readonly jwtService: JwtService,
        private readonly poolService: PoolService) {
    }

    /**
     * Valida el usuario logueado
     * @param body 
     */
    async validateUser(body: any): Promise<any> {
        const { username, password, ip = '127.0.0.1', device = 'S/D', browser = 'S/B', userAgent = 'S/U' } = body;
        let int_intentos = 0;
        let user = await this.securityService.getByUser(username);
        /* console.log("usuaerio=>",user); */
        // TODO: verifico que exista el usuario
        if (user.length === 0) {
            throw new UnauthorizedException({
                status: false,
                auth: false,
                message: 'El usuario o la contraseña no coinciden'
            });
        }
        // TODO: verifico que el usuario este activo
        if (!user[0].activo_segusu) {
            throw new UnauthorizedException({
                status: false,
                auth: false,
                message: 'La cuenta está desactivada, contactese con el administrador'
            });
        }
        // TODO: verifico que el usuario no este bloqueado
        if (user[0].bloqueado_segusu) {
            throw new UnauthorizedException({
                status: false,
                auth: false,
                message: 'El usuario está bloqueado, contactese con el administrador'
            });
        }
        // TODO: verfico que el usuario no este caducado
        if (Utils.isDefined(user[0].fecha_caduc_segusu)) {
            if (!Utils.isFechaMayorOrIgual(user[0].fecha_caduc_segusu, Utils.currentDate())) {
                throw new UnauthorizedException({
                    status: false,
                    auth: false,
                    message: 'La vigencia de su usuario a caducado, contactese con el administrador'
                });
            }
        }
        // TODO: Verifico intentos fallidos vs intentos maximon
        const maximo_intentos = await this.securityService.getNumberAccessAttempts(user[0].ide_segper);
        int_intentos = await this.securityService.getIntentsAccess(user[0].ide_segusu, Utils.currentDate(), ip, maximo_intentos);
        //console.log(maximo_intentos, int_intentos);
        if (int_intentos > maximo_intentos) {
            throw new UnauthorizedException({
                status: false,
                auth: false,
                block: true,
                message: 'A sobrepasado el número máximo de intentos para acceder al sistema, se bloqueará el usuario, contáctese con el administrador del sistema para desbloquearlo'
            });
        }
        // TODO: Verifica que exista una clave activa para el usuario
        const clave = await this.securityService.getPasswordActiveUser(user[0].ide_segusu);
        /*  console.log("calveee=>",clave);  */
        if (!clave) {
            throw new UnauthorizedException({
                status: false,
                auth: false,
                message: 'El usuario no tiene una clave activa, contactese con el administrador'
            });
        }
        // TODO: Verifico que la fecha de la clave este vigente
        /* console.log("verificvov");
        if(clave[0].fecha_vence_seuscl != undefined){
            console.log('pasooo');
            if (Utils.isDefined(clave[0].fecha_vence_seuscl)) {
                console.log("verifiquww");
                if (!Utils.isFechaMayorOrIgual(clave[0].fecha_vence_seuscl, Utils.currentDate())) {
                    throw new UnauthorizedException({
                        status: false,
                        auth: false,
                        message: 'La vigencia de su usuario a caducado, contactese con el administrador'
                    });
                }
            }
        } */

        // TODO: Verifico la contraseña
        const isMatch = compareSync(password, clave[0].clave_seuscl);
        if (!isMatch) {
            int_intentos++;
            const dontMatch = await this.securityService.createAuditAccess(user[0].ide_segusu, FALLO_INGRESO, "Fallo ingreso intento : " + int_intentos, ip, device, browser, userAgent);
            let message = 'El usuario o la contraseña no coinciden';
            if (int_intentos === maximo_intentos) {
                const block = this.securityService.blockUser(user[0].ide_segusu, 'Bloquear usuario por sobrepasar el numero maximo de intentos : ' + maximo_intentos, ip, device, browser, userAgent);
                message = 'A sobrepasado el número máximo de intentos para acceder al sistema, se bloqueara el usuario, contáctese con el administrador del sistema para desbloquearlo'
            }
            throw new UnauthorizedException({
                status: false,
                auth: false,
                message
            });
        }
        // TODO: Verifico que el perfil o rol del usuario este activo
        if (!await this.securityService.isProfileActive(user[0].ide_segper)) {
            throw new UnauthorizedException({
                status: false,
                auth: false,
                message: 'El perfil de su usuario esta desactivado, contactese con el administrador del sistema'
            });
        }
        // TODO: reseteo los intentos fallidos 
        const reset = this.securityService.resetFailedAttempts(user[0].ide_segusu, ip);
        delete user.password_segusu;

        // TODO: ultima fecha de sesion
        user['lastAccess'] = await this.securityService.getLatestUserAccess(user[0].ide_segusu) + '-1';

        if (!user[0].cambia_clave_segusu) {
            await this.securityService.createAuditAccess(user[0].ide_segusu, INGRESO_USUARIO, "Ingresó al sistema", ip, device, browser, userAgent);
        }

        //TODO: retorno permiso del menu

        // const menu = await this.securityService.getMenu(user[0].ide_segper);

        // asigno al usuari los permisos de menu
        // user[0]['menu'] = menu.data;

        delete user[0].activo_segusu;
        delete user[0].bloqueado_segusu;
        // delete user[0].cambia_clave_segusu;
        delete user[0].reset_send_segusu;
        delete user[0].fecha_reg_segusu;
        delete user[0].fecha_caduc_segusu;

        return user;
    }

    async login(user: any) {
        const payload: IJwtPayload = { use: user.username_segusu, sub: user.ide_segusu, per: user.ide_segper, adm: user.admin_multi_segusu };
        const menu = await this.securityService.getMenu(user.ide_segper);
        const token = await this.jwtService.signAsync(payload);
        return {
            status: true,
            message: (user.cambia_clave_segusu) ? 'Tiene que cambiar la clave' : 'Atentificación exitosa',
            isChangePassword: user.cambia_clave_segusu,
            uid: (user.cambia_clave_segusu) ? user.ide_segusu : null,
            accessToken: token,
            menu: menu.data
        };
    }

    async singout(signOutDto: SignOutDto) {
        const { ide_segusu, ip, device, browser, userAgent } = signOutDto;
        try {
            const audit = await this.securityService.createAuditAccess(ide_segusu, 9, 'Salío del sistema', ip, device, browser, userAgent);
            return {
                success: true,
                message: 'Cerro la sesión correctamente',
                data: []
            }
        } catch (error) {
            throw new NotFoundException({
                status: false,
                message: 'El usuario o la contraseña no coinciden',
                error
            });
        }
    }

    async tokenRenew(usuario: number) {
        const user = await this.securityService.getUserAutenticated(usuario);
        const ultimoAcceso = await this.securityService.ultimoAccesoUsuario(usuario);

        //console.log('user=>',user);
        //console.log('ultimo acceso=>',ultimoAcceso);
        if (user.length <= 0) {
            throw new NotFoundException({
                status: false,
                message: 'El usuario no existe',
            });
        }

        // delete campos
        /*delete user[0].activo_segusu;
        delete user[0].bloqueado_segusu;
        delete user[0].cambia_clave_segusu;
        delete user[0].admin_multi_segusu;
        delete user[0].reset_send_segusu;
        delete user[0].fecha_reg_segusu;
        delete user[0].fecha_caduc_segusu;*/

        const payload: IJwtPayload = { use: user[0].username_segusu, sub: user[0].ide_segusu, per: user[0].ide_segper, adm: user[0].admin_multi_segusu };
        const accessToken = this.jwtService.sign(payload);
        return {
            status: true,
            message: 'Token renovado',
            user,
            accessToken,
            accessDate: ultimoAcceso
        };
    }

    async forgotPassword(email: string) {
        //console.log('email >> ', email);
        const user = await this.securityService.forgotPassword(email);
        //console.log('user=>',user);
        if (user.length === 0) {
            throw new UnauthorizedException({
                success: false,
                auth: true,
                message: '¡El correo electrónico no se encuentra! ¿Está seguro de que ya es miembro?',
            });
        }

        const token = this.jwtService.sign({ sub: user[0].ide_segusu, per: user[0].ide_segper }, { expiresIn: '5m',secret:'misecretkey' },);
        const correo = await this.mailService.resetPassword(user[0].nombre_segusu, email, 'http://localhost:4200/reset-password/' + token)
        //console.log('paso token');
        //const correo = await this.mailService.sendMail();
        if (correo) {
            return {
                success: true,
                auth: true,
                message: `¡Se envió a ${email} el restablecimiento de contraseña! Recibirás un correo electrónico.`
            };
        } else {
            throw new UnauthorizedException({
                success: false,
                auth: true,
                message: 'No se pudo enviar el correo.',
            });
        }
        // console.log('mensaje correo', correo);
        /*  */

    }

    async resetPassword(resetPasswordDto: ResetPasswordDto, token: string) {
        const { newPassword } = resetPasswordDto;
        let verify;
        await this.jwtService.verifyAsync(token).then(
            (res) => {
                verify = res;
            }
        ).catch(err => {
            //console.log('res err=>',err);
            if (err.message === 'invalid signature'|| err.message==='invalid token') {
                throw new UnauthorizedException({
                    success: false,
                    message: 'No estas autorizado, token inválido.'
                });
            }
            if (err.message === 'jwt expired') {
                throw new UnauthorizedException({
                    success: false,
                    message: 'No estas autorizado, token caducádo.'
                });
            }

        });
        // console.log(verify.sub);
        try {
            const data = await this.changePassword(newPassword, verify.sub);
            return {
                success: true,
                message: 'Se cambio la contraseña correctamente, inicie sesión nuevamente',
            }
        } catch (error) {
            throw new UnauthorizedException({
                success: false,
                message: 'Error al ejecutar query',
                error
            });
        }
    }

    async changePassword(newPassword: string, usuario: number) {
        let sql = `select ide_segusu,clave_seuscl from seg_usuario_clave where ide_segusu=$1 and activo_seuscl=true`;
        try {
          const data = await this.poolService.consult(sql, [usuario]);
          const password = await hashSync(newPassword, 10);
          if (data.length <= 0) {
            throw (`El usuario no existe en la base de datos`);
          }
          
          await this.updatePassword(password, usuario);
          return {
            success: true,
            message: 'Se cambio correctamente la contraseña.',
          }
    
        } catch (error) {
          throw new BadRequestException({
            success: false,
            message: 'Error al restablecer la contraseña',
            error
          });
        }
      }

      private async updatePassword(password: string, user: number) {
        const query = `UPDATE seg_usuario_clave
        SET clave_seuscl=$1
        WHERE ide_segusu=$2;`;
        const data = await this.poolService.consult(query, [password, user]);
        return data;
      }
      
/*     private removeFieldsUser(user, tipo?: number) {

        delete user.activo_segusu;
        delete user.bloqueado_segusu;
        if (tipo == 1) {
            delete user.admin_multi_segusu;
        }
        delete user.cambia_clave_segusu;
        delete user.reset_send_segusu;
        delete user.fecha_reg_segusu;
        delete user.fecha_caduc_segusu;
    } */
}
