import { VendedorRepository } from "../repository/vendedor.repository";
import { Vendedor } from "../models/pessoa.model";

export class VendedorService {
    constructor(private _repository = new VendedorRepository()) { }

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async criar(idVendedor: number, nome: string, email: string, matricula: number) {
        const novoVendedor = new Vendedor(idVendedor,
            nome,
            email,
            matricula,
            new Date());
        return await this._repository.create(novoVendedor);
    }

    async editar(idVendedor: number, nome: string, email: string, matricula: number) {
        const vendedor = new Vendedor(idVendedor,
            nome,
            email,
            matricula, 
            new Date());
        return await this._repository.update(idVendedor, vendedor);
    }

    async deletar(id: number) {
        return await this._repository.delete(id);
    }

    async selecionaById(id: number) {
        return await this._repository.findById(id);
    }

}
