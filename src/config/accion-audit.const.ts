/**
 * Sirve para cuando un usuario accede exitosamente al sistema
 */
 export const INGRESO_USUARIO = 1;
 /**
  * Sirve para cuando no se produce un acceso al sistema por parte de un
  * usuario
  */
 export const FALLO_INGRESO = 2;
 /**
  * Sirve para cuando se bloqueao a un usuario
  */
 export const BLOQUEA_USUARIO = 3;
 /**
  * Sirve para cuando se pone en estado inactivo a un usuario
  */
 export const DESACTIVA_USUARIO = 4;
 /**
  * Sirve para cuando se pone en estado activo a un usuario
  */
 export const ACTIVA_USUARIO = 5;
 /**
  * Sirve para cuando un usuario cambia su clave
  */
 export const CAMBIO_CLAVE = 6;
 /**
  * Sirve para cuando se resetea la clave de un usuario
  */
 export const RESETEO_CLAVE = 7;
 /**
  * Sirve para cuando a un usuario se le expira el tiempo de su session
  */
 export const CADUCO_SESSION = 8;
 /**
  * Sirve para cuando un usuario sale del sistema
  */
 export const SALIO_USUARIO = 9;
 /**
  * Sirve para cuando se crea un usuario en el sistema
  */
 export const CREAR_USUARIO = 10;
 /**
  * Sirve para cuando se desbloquea a un usuario
  */
 export const DESBLOQUEA_USUARIO = 11;
 /**
  * Sirve para cuando el usuario Abre una Pantalla
  */
 export const ABRIO_PANTALLA = 12;
 