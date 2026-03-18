import { Router } from "express";
import { ItemPedidoController } from "../controllers/itemPedido.controller";

const router = Router();
const controller = new ItemPedidoController();

router.get("/itemPedido", controller.listarPorPedido);
router.post("/itemPedido", controller.criarItem);
router.delete("/itemPedido", controller.removerItem);
router.put("/itemPedido", controller.editarItem);


export default router;
