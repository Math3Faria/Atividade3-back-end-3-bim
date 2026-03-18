import { RowDataPacket } from "mysql2";

export interface IItemPedido extends RowDataPacket {
    id?: number;
    idPedido?: number;
    idProduto?: number;
    quantidade?: number;
    precoUnitario?: number;
}

export class ItemPedido {
    private _id?: number;
    private _idPedido: number;
    private _idProduto: number;
    private _quantidade: number;
    private _precoUnitario: number;

    constructor(idPedido: number, idProduto: number, quantidade: number, precoUnitario: number, id?: number) {
        this._idPedido = idPedido;
        this._idProduto = idProduto;
        this._precoUnitario = precoUnitario;
        this._id = id;
        
        this._validarQuantidade(quantidade);
        this._quantidade = quantidade;
    }

    public get id(): number | undefined { return this._id; }
    public get idPedido(): number { return this._idPedido; }
    public get idProduto(): number { return this._idProduto; }
    public get quantidade(): number { return this._quantidade; }
    public get precoUnitario(): number { return this._precoUnitario; }

    public get subtotal(): number {
        return this._quantidade * this._precoUnitario;
    }

    private _validarQuantidade(valor: number): void {
        if (valor <= 0) {
            throw new Error("Não da para adicionar 0 itens nem menos que isso, adicione mais de um item");
        }
    }
}
