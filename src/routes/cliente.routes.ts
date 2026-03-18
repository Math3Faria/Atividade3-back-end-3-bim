import { Router } from "express";
import { ClienteController } from "../controllers/cliente.controller";

const router = Router();
const controller = new ClienteController();

router.get("/cliente", controller.selecionarTodos);
router.get("/cliente/buscar", controller.selecionaById);
router.post("/cliente", controller.criar);
router.put("/cliente", controller.editar);
router.delete("/cliente", controller.deletar);

export default router;
