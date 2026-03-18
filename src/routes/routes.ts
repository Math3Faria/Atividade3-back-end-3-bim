import { Router } from 'express';
import clienteRoutes from './cliente.routes';
import vendedorRoutes from './vendedor.routes';
import produtoRoutes from './produto.routes';
import categoriaRoutes from './categoria.routes'; 
import itemPedidoRoutes from './itemPedido.routes';
import pedidoRoutes from './pedido.routes';

const router = Router();

router.use('/', clienteRoutes);
router.use('/', vendedorRoutes);
router.use('/', pedidoRoutes);
router.use('/', categoriaRoutes);
router.use('/', produtoRoutes);
router.use('/', itemPedidoRoutes);

export default router;
