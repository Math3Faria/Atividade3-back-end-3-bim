import { db } from "../database/connection.database";
import { IItemPedido } from "../models/itemPedido.model";
import { ResultSetHeader } from "mysql2/promise";

export class ItemPedidoRepository {

    async create(item: IItemPedido): Promise<ResultSetHeader> {
        const sql = 'insert into itens_pedidos (idPedido, idProduto, quantidade, precoUnitario) values (?, ?, ?, ?);';
        const values = [item.idPedido ?? null, item.idProduto ?? null, item.quantidade ?? null, item.precoUnitario ?? null];
        const [result] = await db.execute(sql, values as any);
        return result as ResultSetHeader;
    }

    async findByPedido(idPedido: number): Promise<IItemPedido[]> {
        const sql = `
        select ip.*, p.nomeProduto from itens_pedidos ip
        inner join produtos p on ip.idProduto = p.idProduto where ip.idPedido = ?;`;
        const [rows] = await db.execute(sql, [idPedido]);
        return rows as IItemPedido[];
    }

    async findById(idItem: number): Promise<IItemPedido | undefined> {

        const sql = 'select * from itens_pedidos where idItem = ?;';
        const [rows]: any = await db.execute(sql, [idItem]);
        return rows[0];
    }

    async calculateTotal(idPedido: number): Promise<number> {
        const sql = `select sum(quantidade * precoUnitario) as total from itens_pedidos where idPedido = ?`;

        const [rows]: any = await db.execute(sql, [idPedido]);
        const resultado = rows[0]?.total;
        return resultado ? Number(resultado) : 0;
    }

    async delete(idItem: number): Promise<ResultSetHeader> {
        const sql = 'delete from itens_pedidos where idItem = ?;';
        const [result] = await db.execute(sql, [idItem]);
        return result as ResultSetHeader;
    }

    async updateQuantidade(idItem: number, novaQuantidade: number): Promise<ResultSetHeader> {
        const sql = 'update itens_pedidos set quantidade = ? where idItem = ?;';
        const [result] = await db.execute<ResultSetHeader>(sql, [novaQuantidade, idItem]);
        return result;
    }

}
