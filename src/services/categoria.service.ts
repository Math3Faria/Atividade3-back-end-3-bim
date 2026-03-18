import { CategoriaRepository } from "../repository/categoria.repository";
import { Categoria } from "../models/categoria.model";

export class CategoriaService {
    constructor(private _repository = new CategoriaRepository()) { }

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async criar(descricaoCategoria: string, vinculoImagem?: string) {
        const categoria = Categoria.criar(descricaoCategoria, vinculoImagem);
        return await this._repository.create(categoria);
    }

    async editar(idCategoria: number, descricaoCategoria: string, vinculoImagem?: string) {
        const categoria = Categoria.editar(idCategoria, descricaoCategoria, vinculoImagem);
        return await this._repository.update(idCategoria, categoria);
    }

    async deletar(idCategoria: number) {
        const result = await this._repository.delete(idCategoria)
        return result;
    }

    async selecionaById(idCategoria: number) {
        const result = await this._repository.findByidCategoria(idCategoria)
        return result;
    }

}