import { Router } from "express";
import { VendedorController } from "../controllers/vendedor.controller";

const router = Router();
const controller = new VendedorController();

router.get("/vendedor", controller.selecionarTodos);
router.get("/vendedor/buscar", controller.selecionaById);
router.post("/vendedor", controller.criar);
router.put("/vendedor", controller.editar);
router.delete("/vendedor", controller.deletar);

export default router;
