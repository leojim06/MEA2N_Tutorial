import { Router } from 'express';
import { PropietarioController } from '../controllers/propietarioController';

const router = Router();

export class PropietarioRoutes {
   private propietarioController: PropietarioController;

   constructor() {
      this.propietarioController = new PropietarioController();
   }

   public get routes(): Router {
      let controller = this.propietarioController;
      router.get('/', controller.getAll);
      router.post('/', controller.create);
      router.get('/:_id', controller.findById);
      router.put('/:_id', controller.update);
      router.delete('/:_id', controller.delete);
      return router;
   }
}