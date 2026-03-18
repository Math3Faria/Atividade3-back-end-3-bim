import { RowDataPacket } from "mysql2";

export interface ICategoria extends RowDataPacket {
    idCategoria?: number;
    descricaoCategoria?: string;
    vinculoImagem?: string;
}

export class Categoria {
    private _idCategoria?: number;
    private _descricaoCategoria: string = "";
    private _vinculoImagem?: string;

    constructor(descricaoCategoria: string, idCategoria?: number, vinculoImagem?: string) {
        this.descricaoCategoria = descricaoCategoria;
        this._idCategoria = idCategoria;
        this._vinculoImagem = vinculoImagem;
    }

    public get idCategoria(): number | undefined { return this._idCategoria; }
    public get descricaoCategoria(): string { return this._descricaoCategoria; }
    public get vinculoImagem(): string | undefined { return this._vinculoImagem; }

    public set descricaoCategoria(value: string) {
        if (!value || value.trim().length < 3) throw new Error("Escreva um nome para categoria que contenha pelo menos 3 caracteres");
        this._descricaoCategoria = value;
    }

    public static criar(descricaoCategoria: string, vinculoImagem?: string): Categoria {
        return new Categoria(
            descricaoCategoria,
            undefined,
            vinculoImagem
        );
    }

    public static editar(idCategoria: number, descricaoCategoria: string, vinculoImagem?: string): Categoria {
        return new Categoria(
            descricaoCategoria,
            idCategoria,
            vinculoImagem
        );
    }
    public static deletar(idCategoria: number): number {
        if (!idCategoria || idCategoria <= 0) {
            throw new Error("O id deve ser um número válido.");
        }
        return idCategoria;
    }

}
