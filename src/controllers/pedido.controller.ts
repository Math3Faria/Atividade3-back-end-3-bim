import { Request, Response } from "express";
import { PedidoService } from "../services/pedido.service";

export class PedidoController {
    constructor(private _service = new PedidoService()) { }

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const pedidos = await this._service.selecionarTodos();
            res.status(200).json({ pedidos });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    }

    criar = async (req: Request, res: Response) => {
        try {
            const { idVendedor, idCliente, statusCompra } = req.body;

            const resultado = await this._service.criar(
                Number(idVendedor),
                Number(idCliente),
                statusCompra
            );

            res.status(201).json(resultado);
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    }

    editar = async (req: Request, res: Response) => {
        try {

            const { idVendedor, idCliente, statusCompra } = req.body;

            const idPedido = Number(req.query.idPedido);

            const alterado = await this._service.editar(
                idPedido,
                Number(idVendedor),
                Number(idCliente),
                statusCompra
            );

            res.status(200).json({ alterado });
       } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }

    deletar = async (req: Request, res: Response) => {
        try {
            const idPedido = Number(req.query.idPedido);
            const deletado = await this._service.deletar(idPedido);

            if (deletado.affectedRows === 0) {
                return res.status(404).json({ message: "Pedido não encontrado" });
            }

            res.status(200).json({ deletado });
        } catch (error: unknown) {
            if (typeof error === 'object' && error !== null && 'code' in error) {
                const err = error as { code?: string };
                if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                    return res.status(400).json({ message: 'Não é possível excluir o pedido pois existem itens vinculados a ele.' });
                }
            }
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    }

    selecionaById = async (req: Request, res: Response) => {
        try {
            const idPedido = Number(req.query.idPedido);

            if (!idPedido || idPedido <= 0) {
                return res.status(400).json({ message: "O id deve ser um número válido" });
            }

            const pedidoPorId = await this._service.selecionaById(idPedido);

            if (!pedidoPorId) {
                return res.status(404).json({ message: "Pedido não encontrado" });
            }

            res.status(200).json({ pedidoPorId });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    }
}
