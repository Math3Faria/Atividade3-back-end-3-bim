import { db } from "../database/connection.database";
import { IProduto } from "../models/produto.model";
import { ResultSetHeader } from "mysql2/promise";

export class ProdutoRepository {

    async findAll(): Promise<IProduto[]> {
        const [rows] = await db.execute<IProduto[]>('select * from produtos;');
        return rows;
    }

    async create(dados: Omit<IProduto, 'idProduto'>): Promise<ResultSetHeader> {
        const sql = 'insert into produtos (nomeProduto, valorProduto, idCategoria, vinculoImagem) values (?,?,?,?);';
        const values = [dados.nomeProduto, dados.valorProduto, dados.idCategoria, dados.vinculoImagem];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(idProduto: number, dados: Omit<IProduto, 'idProduto'>): Promise<ResultSetHeader> {
        const sql = 'update produtos set nomeProduto=?, valorProduto=?, idCategoria=?, vinculoImagem=? where idProduto=?;';
        const values = [dados.nomeProduto, dados.valorProduto, dados.idCategoria, dados.vinculoImagem, idProduto];

        const [rows] = await db.execute<ResultSetHeader>(sql, values)
        return rows;
    }

    async delete(idProduto: number): Promise<ResultSetHeader> {
        const sql = 'delete from produtos where idProduto = ?;';
        const [rows] = await db.execute<ResultSetHeader>(sql, [idProduto]);
        return rows;
    }

    async findById(idProduto: number): Promise<IProduto | undefined> {
        const sql = 'select * from produtos where idProduto = ?;';
        const [rows] = await db.execute<IProduto[]>(sql, [idProduto]);
        return rows[0];
    }
}
