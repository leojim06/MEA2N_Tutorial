/**
 * Interface para manipular información que se escribe en el repositorio
 * 
 * @export
 * @interface WriteRepository
 * @template T
 */
export interface WriteRepository<T> {
    /**
     * Crea un nuevo elemento de tipo @type <T> y retorna la información con ayuda de un 
     * callback, ya sea de error o de resultado
     * 
     * 
     * @memberOf WriteRepository
     */
    create: (item: T, callback: (error: any, result: any) => void) => void;
    /**
     * Actualiza un elemento recuperado del repositorio mediante el id de tipo @type
     * @see mongoose.Types.ObjectId y retorna la información con ayuda de un 
     * callback, ya sea de error o de resultado
     * 
     * 
     * @memberOf WriteRepository
     */
    update: (item: T, data: T, callback: (error: any, result: any) => void) => void;
    /**
     * Elimina un elemento recuperado del repositorio mediante el id de tipo @type
     * @see mongoose.Types.ObjectId y retorna la información con ayuda de un
     * callback, ya sea de error o de resultado
     * 
     * 
     * @memberOf WriteRepository
     */
    delete: (item: T, callback: (error: any, result: any) => void) => void;
}