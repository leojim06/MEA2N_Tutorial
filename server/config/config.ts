/**
 * Clase que contiene parametros de configuración de la aplicación
 * 
 * @export parametros de configuración
 * @class Config
 */
export class Config {
    /**
     * Puerto de la aplicación
     * 
     * @static
     * @type {number}
     * @memberOf Config
     */
    static PORT: number = normalizePort(process.env.PORT || 3000);

    /**
     * Base de datos de la aplicación
     * 
     * @static
     * @type {string}
     * @memberOf Config
     */
    static DB: string = process.env.MONGOLAB_URI || "mongodb://localhost/gpsfinca";
    
    /**
     * Cadena secreta para encriptacion
     * 
     * @static
     * @type {string}
     * @memberOf Config
     */
    static SECRET: string = "super.super.secret.shhh";
}


/**
 * Función que convierte el valor ingresado en un número válido de puerto
 * 
 * @param {number} val Valor del puerto a normalizar
 * @returns {number} PORT puerto normalizado
 */
function normalizePort(val: number): number {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return null;
}