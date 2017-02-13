import { ReadBusiness } from './read';
import { WriteBusiness } from './write';

/**
 * Interface para crear el CRUD de los elementos <T> en la capa de
 * business, para agregar alguna información según se establezcan 
 * en las normas del negocio
 * 
 * @export
 * @interface BaseBusiness
 * @extends {ReadBusiness<T>}
 * @extends {WriteBusiness<T>}
 * @template T
 */
export interface BaseBusiness<T> extends ReadBusiness<T>, WriteBusiness<T> { }