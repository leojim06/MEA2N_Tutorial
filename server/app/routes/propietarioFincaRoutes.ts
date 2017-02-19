import { Router } from 'express';
import { PropietarioFincaController } from '../controllers';

const router = Router();

export class PropietarioFincaRoutes {
   private propietarioFincaController: PropietarioFincaController;

   constructor() {
      this.propietarioFincaController = new PropietarioFincaController();
   }

   public get routes(): Router {
      let controller = this.propietarioFincaController;
      router.get('/:_id/fincas', controller.get);      // Obtiene todas las fincas del propietario con _id    
      router.post('/:_id/fincas', controller.create);  // Crea una nueva finca y la agrega al propietario _id
      return router;
   }
}