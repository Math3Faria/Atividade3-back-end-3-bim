import { RowDataPacket } from "mysql2";

export interface IProduto extends RowDataPacket {
    idProduto?: number;
    nomeProduto?: string;
    valorProduto?: number;
    idcategoria?: number;
    dataCad?: Date;
    vinculoImagem?: string;
}

export class Produto {
    private _idProduto?: number;
    private _nomeProduto: string = "";
    private _valorProduto: number;
    private _idCategoria?: number;
    private _dataCad?: Date;
    private _vinculoImagem?: string;

    constructor(nomeProduto: string, valorProduto: number, idCategoria: number, idProduto?: number, vinculoImagem?: string) {
        this.nomeProduto = nomeProduto;
        this._valorProduto = valorProduto;
        this._idCategoria = idCategoria;
        this._idProduto = idProduto;
        this._vinculoImagem = vinculoImagem;
    }

    public get idProduto(): number | undefined { return this._idProduto; }
    public get nomeProduto(): string { return this._nomeProduto; }
    public get idCategoria(): number | undefined { return this._idCategoria; }
    public get valorProduto(): number { return this._valorProduto; }
    public get vinculoImagem(): string | undefined { return this._vinculoImagem; }

    public set nomeProduto(value: string) {
        this._validarnomeProduto(value);
        this._nomeProduto = value;
    }

    public set vinculoImagem(value: string | undefined) {
        this._vinculoImagem = value;
    }

    public static criar(nomeProduto: string, valorProduto: number, idCategoria: number, vinculoImagem?: string): Produto {
        return new Produto(
            nomeProduto,
            valorProduto,
            idCategoria,
            undefined,
            vinculoImagem
        );
    }

    public static editar(idProduto: number, nomeProduto: string, valorProduto: number, idCategoria: number, vinculoImagem?: string): Produto {
        return new Produto(
            nomeProduto,
            valorProduto,
            idCategoria,
            idProduto,
            vinculoImagem
        );
    }

    private _validarnomeProduto(value: string): void {
        if (!value || value.trim().length < 3) {
            throw new Error("Escreva um produto com pelo menos 3 caracteres no nome");
        }
        if (value.trim().length > 45) {
            throw new Error("O nome do produto nao pode ser maior que 45 caracteres");
        }
    }

    public static deletar(idProduto: number): number {
        if (!idProduto || idProduto <= 0) {
            throw new Error("O id deve ser um número válido.");
        }
        return idProduto;
    }
}
