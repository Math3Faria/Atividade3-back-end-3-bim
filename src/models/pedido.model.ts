import { RowDataPacket } from "mysql2";

export interface IPedido extends RowDataPacket {
    idPedido?: number;
    idCliente?: number;
    data_pedido?: Date;
    valor_total?: number;
    statusCompra?: string
}

type StatusPedido = 'Pendente' | 'Pago' | 'Cancelado';

export class Pedido {
    private _idVendedor?: number;
    private _idPedido?: number;
    private _idCliente: number;
    private _data_pedido?: Date;
    private _valor_total: number;
    private _statusCompra: StatusPedido;

    constructor(
        idVendedor: number,
        idCliente: number, 
        valor_total: number, 
        statusCompra: string = 'Pendente',
        idPedido?: number, 
        data_pedido?: Date
    ) {
        this._idVendedor = idVendedor;
        this._idCliente = idCliente;
        this._valor_total = valor_total;
        this._statusCompra = statusCompra as StatusPedido; 
        this._idPedido = idPedido;
        this._data_pedido = data_pedido;
        
        this._validarPedido();
    }

    public get idPedido(): number | undefined { return this._idPedido; }
    public get idCliente(): number { return this._idCliente; }
    public get valor_total(): number { return this._valor_total; }
    public get statusCompra(): StatusPedido { return this._statusCompra; }
    public get data_pedido(): Date | undefined { return this._data_pedido; }

    public static criar(idVendedor: number, idCliente: number, valor_total: number, statusCompra?: string): Pedido {
        return new Pedido(
            idVendedor,
            idCliente,
            valor_total,
            statusCompra
        );
    }

    public static editar(idVendedor: number, idPedido: number, idCliente: number, valor_total: number, statusCompra: string): Pedido {
        return new Pedido(
            idVendedor,
            idCliente, valor_total,
            statusCompra,
            idPedido
        );
    }

    private _validarPedido(): void {
        if (!this._idCliente || this._idCliente <= 0) {
            throw new Error("ID do cliente inválido.");
        }
        if (this._valor_total < 0) {
            throw new Error("O valor total não pode ser negativo.");
        }
        const statusPermitidos = ['Pendente', 'Pago', 'Cancelado'];
        if (!statusPermitidos.includes(this._statusCompra)) {
            throw new Error("Digite um status de compra valido: 'Pendente', 'Pago', 'Cancelado'");
        }
    }

    public static deletar(idPedido: number): number {
        if (!idPedido || idPedido <= 0) {
            throw new Error("O ID do pedido deve ser um número válido.");
        }
        return idPedido;
    }
}
