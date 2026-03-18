import { Router } from "express";
import { CategoriaController } from "../controllers/categoria.controller";
import uploadImage from "../middlewares/uploadImage.middleware";

const router = Router();
const controller = new CategoriaController();

router.get("/categorias", controller.selecionarTodos);
router.post("/categorias", uploadImage, controller.criar);
router.put("/categorias", uploadImage, controller.editar);
router.delete("/categorias", controller.deletar);

export default router;
