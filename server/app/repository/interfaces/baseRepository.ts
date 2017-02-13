import { ReadRepository } from './Read';
import { WriteRepository } from './Write';

/**
 * Interface para crear el CRUD de elementos <T> y que trabaja directamente
 * con el repositorio o base de datos de mongoDB
 * 
 * @export
 * @interface BaseRepository
 * @extends {ReadRepository<T>}
 * @extends {WriteRepository<T>}
 * @template T
 */
export interface BaseRepository<T> extends ReadRepository<T>, WriteRepository<T> { }