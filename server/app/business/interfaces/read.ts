/**
 * Interface para leer información que se encuentra en la capa business
 * 
 * @export
 * @interface ReadBusiness
 * @template T
 */
export interface ReadBusiness<T> {
    /**
     * Manipular la información que se obtiene de la capa superior (controller) 
     * al recuperar todos los elementos de tipo T y enriquece la información
     * según las normas de negocio para enviarla a la capa siguiente (repository)
     * 
     * 
     * @memberOf ReadBusiness
     */
    getAll: (callback: (error: any, result: T) => void) => void;
    /**
     * Manipular la información que se obtiene de la capa superior (controller) 
     * al recuperar un elementos de tipo T por su _id y enriquece la información
     * según las normas de negocio para enviarla a la capa siguiente (repository)
     * 
     * 
     * @memberOf ReadBusiness
     */
    findById: (_id: string, callback: (error: any, result: T) => void) => void;
}