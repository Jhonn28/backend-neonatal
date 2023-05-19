import * as moment from 'moment'

export default class Utils {

    /**
     * Returns the current date
     * @param format date format default 'YYYYY-MM-DD'.
     * @returns date
    */
    static currentDate(format?: string) {
        if (format === undefined) {
            format = 'YYYY-MM-DD';
        }
        return moment(Date.now()).format(format);
    }

    /**
     * Returns the current time
     * @returns time
     */
    static currentTime() {
        return moment(Date.now()).format('HH:mm:ss');
    }

    /**
     * Returns the date converted according to the format
     * @param date date to convert
     * @param format date format default 'DD-MM-YYYY'
     * @returns 
     */
    static convertDate(date: string, format?: string) {
        if (format === undefined) {
            format = 'DD-MM-YYYY';
        }
        return moment(date).format(format);
    }

    /**
     * Compara si la fecha1 es mayor a la fecha 2
     * @param fechaInicio 
     * @param fechaFin 
     * @param formato 
     */
    static isFechaMenorOrIgual(fecha1: string, fecha2: string): boolean {
        return moment(fecha1).isSameOrBefore(fecha2)
    }

    static isFechaMayorOrIgual(fecha1: string, fecha2: string): boolean {
        return moment(fecha1).isSameOrAfter(fecha2)
    }

    /**
     * Retorna si una variable esta definida
     * @param $variable
     */
    static isDefined($variable: any): boolean {
        return typeof $variable !== 'undefined' && $variable !== null;
    }

}