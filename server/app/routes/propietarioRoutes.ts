import { Router } from 'express';
import { PropietarioController } from '../controllers';

const router = Router();

export class PropietarioRoutes {
   private propietarioController: PropietarioController;

   constructor() {
      this.propietarioController = new PropietarioController();
   }

   public get routes(): Router {
      let controller = this.propietarioController;
      router.get('/', controller.getAll);         // Obtiene todos los propietarios - no obtiene fincas
      router.post('/', controller.create);        // Crea un propietario nuevo
      router.get('/:_id', controller.findById);   // Obtiene un propietario por _id - no obtiene fincas
      router.put('/:_id', controller.update);     // Actualiza la información de un propietario por _id
      router.delete('/:_id', controller.delete);  // Elimina un propietario ( ** y sus propiedades - eliminación en cascada)
      return router;
   }
}