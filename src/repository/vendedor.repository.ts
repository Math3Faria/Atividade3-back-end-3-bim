import { db } from "../database/connection.database";
import { Vendedor } from "../models/pessoa.model";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

export class VendedorRepository {
    async create(vendedor: Vendedor): Promise<ResultSetHeader> {
        const sql = "insert into vendedores (matricula, nome, email, dataAdmissao) values (?,?,?,?);";
        const values = [vendedor.matricula, vendedor.nome, vendedor.email, vendedor.dataAdmissao];
        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result;
    }

    async findAll(): Promise<Vendedor[]> {
        const [rows] = await db.execute<RowDataPacket[]>("select * from vendedores;");
        return rows.map(row => new Vendedor(
            row.idVendedor, row.nome, row.email, row.matricula, new Date(row.dataAdmissao)
        ));
    }


    async findById(idVendedor: number): Promise<Vendedor | undefined> {
        const [rows] = await db.execute<RowDataPacket[]>("select * from vendedores where idVendedor=?;", [idVendedor]);
        if (rows.length === 0) return undefined;
        const r = rows[0];
        return new Vendedor(r.idVendedor, r.nome, r.email, r.matricula, new Date(r.dataAdmissao));
    }

    async update(idVendedor: number, vendedor: Vendedor): Promise<ResultSetHeader> {
        const sql = "update vendedores set matricula=?, nome=?, email=? where idVendedor=?;";
        const values = [vendedor.nome, vendedor.email, vendedor.matricula, idVendedor];
        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result;
    }

    async delete(idVendedor: number): Promise<ResultSetHeader> {
        const [result] = await db.execute<ResultSetHeader>("delete from vendedores where idVendedor=?;", [idVendedor]);
        return result;
    }
}
