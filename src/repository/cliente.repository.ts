import { db } from "../database/connection.database";
import { Cliente, Pessoa } from "../models/pessoa.model";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

export class ClienteRepository {
    async create(cliente: Cliente): Promise<ResultSetHeader> {
        const sql = "insert into clientes (nome, email, cpf, endereco, dataCad) values (?,?,?,?,?);";
        const values = [cliente.nome, cliente.email, cliente.cpf, cliente.endereco, cliente.dataCad];
        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result;
    }
    async findAll(): Promise<Cliente[]> {
        const [rows] = await db.execute<RowDataPacket[]>(
            "select * from clientes;");
        return rows.map(row => new Cliente(row.idCliente, row.nome, row.email, row.cpf, row.endereco, new Date(row.data_cadastro)));
    }

    async delete(idCliente: number): Promise<ResultSetHeader> {
        const [result] = await db.execute<ResultSetHeader>(
            "delete from clientes where idCliente=?;", [idCliente]);
        return result;
    }

    async findById(id: number): Promise<Cliente | undefined> {
        const [rows] = await db.execute<RowDataPacket[]>(
            "select * from clientes where id=?;", [id]);

        if (rows.length === 0) return undefined;

        const r = rows[0];
        return new Cliente(r.idCliente, r.nome, r.email, r.cpf, r.endereco, new Date(r.data_cadastro));
    }




    async update(idCliente: number, cliente: Cliente): Promise<ResultSetHeader> {
        const sql = "update clientes set nome=?, email=?, cpf=?, endereco=? where idCliente=?;";
        const values = [cliente.nome, cliente.email, cliente.cpf, cliente.endereco, idCliente];
        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result;
    }
}
