import { Router } from 'express';
import { FincaController } from '../controllers';

const router = Router();

export class FincaRoutes {
   private fincaController: FincaController;

   constructor() {
      this.fincaController = new FincaController();
   }

   public get routes(): Router {
      let controller = this.fincaController;
      router.get('/', controller.getAll);         // Obtiene todas las fincas - no obtiene información de propietarios
      router.get('/:_id', controller.findById);   // Obtiene una finca por _id - no obtiene información de propietarios
      router.put('/:_id', controller.update);     // Actualiza una finca por _id
      router.delete('/:_id', controller.delete);  // Elimina una finca (** y su relación con el propietario)
      return router;
   }
}