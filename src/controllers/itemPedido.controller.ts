import { Request, Response } from "express";
import { ItemPedidoService } from "../services/itemPedido.service";
import { PedidoService } from "../services/pedido.service";

export class ItemPedidoController {

    constructor(
        private _service = new ItemPedidoService(),
        private _pedidoService = new PedidoService()
    ) { }

    criarItem = async (req: Request, res: Response) => {
        try {
            const { idPedido, idProduto, quantidade } = req.body;

            if (!idPedido || !idProduto || isNaN(Number(quantidade))) {
                return res.status(400).json({ message: "Dados inválidos. idPedido, idProduto e quantidade (número) são obrigatórios." });
            }

            if (Number(quantidade) <= 0) {
                return res.status(400).json({ message: "A quantidade deve ser maior que zero." });
            }

            const pedido = await this._pedidoService.selecionaById(Number(idPedido));

            if (!pedido) {
                return res.status(404).json({ message: "Pedido não encontrado no sistema." });
            }

            if (pedido.statusCompra === 'Pago') {
                return res.status(400).json({ message: "Operação negada: Este pedido já foi Pago e não pode receber novos itens." });
            }

            const resultado = await this._service.adicionarItem(
                Number(idPedido),
                Number(idProduto),
                Number(quantidade)
            );

            res.status(201).json(resultado);
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }

    listarPorPedido = async (req: Request, res: Response) => {
        try {
            const idPedido = Number(req.query.idPedido);
            if (!idPedido) return res.status(400).json({ message: "ID do pedido é obrigatório" });

            const itens = await this._service.buscarPorPedido(idPedido);
            res.status(200).json({ itens });
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }
    removerItem = async (req: Request, res: Response) => {
        try {
            const idItem = Number(req.query.idItem);
            const idPedido = Number(req.query.idPedido);

            const pedido = await this._pedidoService.selecionaById(idPedido);

            if (pedido && pedido.statusCompra === 'Pago') {
                return res.status(400).json({ message: "Não é possível remover itens. O pedido já está Pago." });
            }

            const resultado = await this._service.removerItem(idItem, idPedido);
            res.status(200).json(resultado);
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }

    editarItem = async (req: Request, res: Response) => {
    try {
        const idItem = Number(req.query.idItem);
        const idPedido = Number(req.query.idPedido);
        const { quantidade } = req.body;

        if (!idItem || !idPedido) {
            return res.status(400).json({ message: "idItem e idPedido são obrigatórios na query." });
        }

        const resultado = await this._service.editarQuantidade(idItem, idPedido, Number(quantidade));

        if (resultado.status === "não encontrado") {
            return res.status(404).json({ message: "Não foi possível editar: Item não encontrado neste pedido." });
        }

        res.status(200).json(resultado);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Erro desconhecido" });
    }
}

}
