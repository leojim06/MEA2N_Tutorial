/**
 * Interface para escribir información que se encuentra en la capa business
 * 
 * @export
 * @interface WriteBusiness
 * @template T
 */
export interface WriteBusiness<T> {
    /**
     * Manipular la información que se obtiene de la capa superior (controller) 
     * al intentar crear un nuevo elemento tipo @type T y enriquece la información
     * según las normas de negocio para enviarla a la capa siguiente (repository)
     * 
     * 
     * @memberOf WriteBusiness
     */
    create: (item: T, callback: (error: any, result: any) => void) => void;
    /**
     * Manipular la información que se obtiene de la capa superior (controller) 
     * al intentar modificar un nuevo elemento tipo @type T recuperado por su ID y 
     * enriquece la información según las normas de negocio para enviarla a la 
     * capa siguiente (repository) 
     * 
     * 
     * @memberOf WriteBusiness
     */
    update: (_id: string, item: T, callback: (error: any, result: any) => void) => void;
    /**
     * Manipular la información que se obtiene de la capa superior (controller) 
     * al intentar eliminar un nuevo elemento recuperado por su ID y enriquece la 
     * información según las normas de negocio para enviarla a la capa siguiente
     * (repository) - Ej. Crear un registro de elementos eliminados y quien
     * realizó la eliminación
     * 
     * 
     * @memberOf WriteBusiness
     */
    delete: (_id: string, callback: (error: any, result: any) => void) => void;
}