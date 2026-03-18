import { db } from "../database/connection.database";
import { IPedido } from "../models/pedido.model";
import { ResultSetHeader } from "mysql2/promise";

export class PedidoRepository {

    async findAll(): Promise<IPedido[]> {
        const sql = 'select * from pedidos;';
        const [rows] = await db.execute<IPedido[]>(sql);
        return rows;
    }

    async findById(idPedido: number): Promise<IPedido | undefined> {
        const sql = 'select * from pedidos where idPedido = ?;';
        const [rows] = await db.execute<IPedido[]>(sql, [idPedido]);
        return rows[0];
    }

    async create(pedido: IPedido): Promise<ResultSetHeader> {
        const sql = 'insert into pedidos (idVendedor, idCliente, statusCompra, valor_total) values (?, ?, ?, ?);';

        const values = [pedido.idVendedor, pedido.idCliente, pedido.statusCompra ?? 'Pendente', pedido.valor_total ?? 0];

        const [result] = await db.execute<ResultSetHeader>(sql, values);
        return result;
    }

    async update(idPedido: number, pedido: IPedido): Promise<ResultSetHeader> {

        const sql = 'update pedidos set idVendedor = ?, idCliente = ?, statusCompra = ?, valor_total = ? where idPedido = ?;';
        const values = [pedido.idVendedor ?? null, pedido.idCliente ?? null, pedido.statusCompra ?? 'Pendente', pedido.valor_total ?? 0, idPedido];
        const [result] = await db.execute<ResultSetHeader>(sql, values as any);
        return result;
    }


    async delete(idPedido: number): Promise<ResultSetHeader> {
        const sql = 'delete from pedidos where idPedido = ?;';
        const [result] = await db.execute<ResultSetHeader>(sql, [idPedido]);
        return result;
    }
}
