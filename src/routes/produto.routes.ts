import { Router } from "express";
import { ProdutoController } from "../controllers/produto.controller";
import uploadImage from "../middlewares/uploadImage.middleware";

const router = Router();
const controller = new ProdutoController();

router.post("/produto", uploadImage, controller.criar); 
router.put("/produto", uploadImage, controller.editar);
router.get("/produto", controller.selecionarTodos);
router.get("/produto/buscar", controller.selecionaById);
router.delete("/produto", controller.deletar);

export default router;
