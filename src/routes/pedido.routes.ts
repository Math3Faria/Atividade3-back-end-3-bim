import { Router } from "express";
import { PedidoController } from "../controllers/pedido.controller";

const router = Router();
const controller = new PedidoController();

router.get("/pedidos", controller.selecionarTodos);
router.post("/pedidos", controller.criar);
router.put("/pedidos", controller.editar);
router.delete("/pedidos", controller.deletar);

export default router;
