import { db } from "../database/connection.database";
import { ICategoria } from "../models/categoria.model";
import { ResultSetHeader } from "mysql2/promise";

export class CategoriaRepository {

    async findAll(): Promise<ICategoria[]> {
        const [rows] = await db.execute<ICategoria[]>(
            'select * from categorias;'
        );
        return rows;
    }

    //omite os campos discriminados
    async create(dados: Omit<ICategoria, 'idCategoria'>): Promise<ResultSetHeader> {
        const sql = 'insert into categorias (descricaoCategoria, vinculoImagem) values (?,?);';
        const values = [dados.descricaoCategoria, dados.vinculoImagem];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async update(idCategoria: number, dados: Omit<ICategoria, 'idCategoria'>): Promise<ResultSetHeader> {
        const sql = 'update categorias set descricaoCategoria=?, vinculoImagem=? where idCategoria=?;';
        const values = [dados.descricaoCategoria, dados.vinculoImagem, idCategoria];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(idCategoria: number): Promise<ResultSetHeader> {
        const sql = 'delete from categorias where idCategoria = ?;';
        const [rows] = await db.execute<ResultSetHeader>(sql, [idCategoria]);
        return rows;
    }

    async findByidCategoria(idCategoria: number): Promise<ICategoria | undefined> {
        const sql = 'select * from categorias where idCategoria = ?;';
        const [rows] = await db.execute<ICategoria[]>(sql, [idCategoria]);
        return rows[0];
    }

}