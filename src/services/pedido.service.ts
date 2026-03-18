import { PedidoRepository } from "../repository/pedido.repository";
import { IPedido } from "../models/pedido.model";

export class PedidoService {
    constructor(private _repository = new PedidoRepository()) { }


    async criar(idVendedor: number, idCliente: number, statusCompra: string = 'Pendente') {

        const valor_total = 0.00;

        const novoPedido = {
            idVendedor,
            idCliente,
            valor_total,
            statusCompra
        } as IPedido;

        return await this._repository.create(novoPedido);
    }


    async selecionarTodos(): Promise<IPedido[]> {
        return await this._repository.findAll();
    }

    async selecionaById(id: number) {
        return await this._repository.findById(id);
    }

    async editar(idPedido: number, idVendedor: number, idCliente: number, statusCompra: string) {
    // 1. Busca o pedido atual para pegar o valor_total que já está salvo
    const pedidoAtual = await this._repository.findById(idPedido);
    
    if (!pedidoAtual) {
        throw new Error("Pedido não encontrado");
    }

    // 2. Monta o objeto de atualização mantendo o valor_total antigo
    const pedidoEditado = {
        idVendedor,
        idCliente,
        statusCompra,
        valor_total: pedidoAtual.valor_total // <--- Mantém o valor que estava no banco
    } as IPedido;

    return await this._repository.update(idPedido, pedidoEditado);
}
    async deletar(id: number) {
        return await this._repository.delete(id);
    }
}
