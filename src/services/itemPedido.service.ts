import { ItemPedidoRepository } from "../repository/itemPedido.repository";
import { PedidoRepository } from "../repository/pedido.repository";
import { ItemPedido, IItemPedido } from "../models/itemPedido.model";
import { ProdutoRepository } from "../repository/produto.repository";

export class ItemPedidoService {
    constructor(
        private _itemRepo = new ItemPedidoRepository(),
        private _pedidoRepo = new PedidoRepository(),
        private _produtoRepo = new ProdutoRepository()
    ) { }

    async adicionarItem(idPedido: number, idProduto: number, quantidade: number) {
        const pedido = await this._pedidoRepo.findById(idPedido);
        if (!pedido) {
            throw new Error("Pedido não encontrado.");
        }
        if (pedido.statusCompra === 'Pago') {
            throw new Error("Não é possível adicionar itens. O pedido já está Pago.");
        }

        const produto = await this._produtoRepo.findById(idProduto);
        if (!produto || produto.valorProduto === undefined) {
            throw new Error("Produto não encontrado ou sem valor definido.");
        }
        const precoUnitario: number = produto.valorProduto;

        const itensNoPedido = await this._itemRepo.findByPedido(idPedido);

        const itemJaExiste = itensNoPedido.find(item => item.idProduto === idProduto);

        if (itemJaExiste) {
            const novaQuantidade = Number(itemJaExiste.quantidade) + quantidade;

            await this._itemRepo.updateQuantidade(itemJaExiste.idItem!, novaQuantidade);
        } else {

            const itemModel = new ItemPedido(idPedido, idProduto, quantidade, precoUnitario);
            await this._itemRepo.create(itemModel as unknown as IItemPedido);
        }

        const novoTotal = await this._itemRepo.calculateTotal(idPedido);
        pedido.valor_total = novoTotal;
        await this._pedidoRepo.update(idPedido, pedido);

        return {
            message: itemJaExiste ? "Quantidade atualizada no pedido!" : "Item adicionado com sucesso!",
            precoAplicado: precoUnitario,
            totalPedido: novoTotal
        };
    }

    async removerItem(idItem: number, idPedido: number) {
        const pedido = await this._pedidoRepo.findById(idPedido);

        if (!pedido) {
            throw new Error("Pedido não encontrado.");
        }

        if (pedido.statusCompra === 'Pago') {
            throw new Error("Não é possível remover itens. O pedido já está Pago.");
        }

        await this._itemRepo.delete(idItem);
        const novoTotal = await this._itemRepo.calculateTotal(idPedido);

        pedido.valor_total = novoTotal;
        await this._pedidoRepo.update(idPedido, pedido);

        return { message: "Item removido!", novoTotal };
    }

    async buscarPorPedido(idPedido: number) {
        return await this._itemRepo.findByPedido(idPedido);
    }
    async editarQuantidade(idItem: number, idPedido: number, novaQuantidade: number) {

        const result = await this._itemRepo.updateQuantidade(idItem, novaQuantidade);

        if (result.affectedRows === 0) {
            return { status: "não encontrado" };
        }

        const novoTotal = await this._itemRepo.calculateTotal(idPedido);

        const pedido = await this._pedidoRepo.findById(idPedido);
        if (pedido) {
            pedido.valor_total = novoTotal;
            await this._pedidoRepo.update(idPedido, pedido);
        }

        return { message: "Quantidade atualizada!", novoTotal, status: "sucesso" };
    }

}
