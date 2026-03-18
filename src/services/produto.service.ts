import { ProdutoRepository } from "../repository/produto.repository";
import { Produto } from "../models/produto.model";

export class ProdutoService {
    constructor(private _repository = new ProdutoRepository()) { }

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async criar(nomeProduto: string, valorProduto: number, idCategoria: number, vinculoImagem?: string) {
        const produto = Produto.criar(
            nomeProduto,
            valorProduto,
            idCategoria,
            vinculoImagem);
        return await this._repository.create(produto);
    }

    async editar(idProduto: number, nomeProduto: string, valorProduto: number, idCategoria: number, vinculoImagem?: string){
        const produto = Produto.editar(idProduto,
            nomeProduto,
            valorProduto,
            idCategoria,
            vinculoImagem);
        return await this._repository.update(idProduto, produto);
    }

    async deletar(idProduto: number){
        const result =  await this._repository.delete(idProduto);
        return result;
    }

    async selecionaById(idProduto: number){
        const result =  await this._repository.findById(idProduto);
        return result;
    }
}
