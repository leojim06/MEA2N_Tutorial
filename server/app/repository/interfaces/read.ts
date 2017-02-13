/**
 * Interface para manipular información que se recupera del repositorio
 * 
 * @export
 * @interface ReadRepository
 * @template T
 */
export interface ReadRepository<T> {
    /**
     * Obtiene todos los elementos del repositorio
     * 
     * 
     * @memberOf ReadRepository
     */
    getAll: (callback: (error: any, result: any) => void) => void;
    /**
     * Obtiene un elemento del repositodio dependiendo de su id
     * 
     * 
     * @memberOf ReadRepository
     */
    findById: (id: string, callback: (error: any, result: T) => void) => void;
}