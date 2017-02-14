import { Router } from 'express';
import { FincaController } from '../controllers/fincaController';

const router = Router();

export class FincaRoutes {
    private fincaController: FincaController;

    constructor() {
        this.fincaController = new FincaController();
    }

    public get routes(): Router {
        let controller = this.fincaController;
        router.get('/', controller.getAll);
        router.post('/', controller.create);
        router.get('/:_id', controller.findById);
        router.put('/:_id', controller.update);
        router.delete('/:_id', controller.delete);
        return router;
    }
}