import { ClienteRepository } from "../repository/cliente.repository";
import { Cliente } from "../models/pessoa.model";

export class ClienteService {
    constructor(private _repository = new ClienteRepository()) { }

    async criar(idCliente: number, nome: string, email: string, cpf: string, endereco: string) {
        const cliente = new Cliente(
            idCliente,
            nome,
            email,
            cpf,
            endereco,
            new Date()
        );
        return await this._repository.create(cliente);
    }

    async selecionarTodos(): Promise<Cliente[]> {
        return await this._repository.findAll();
    }

    async deletar(id: number) {
        return await this._repository.delete(id);
    }

    async selecionaById(id: number) {
        return await this._repository.findById(id);
    }

    async editar(id: number, nome: string, email: string, cpf: string, endereco: string) {
        const cliente = new Cliente(
            id,
            nome,
            email,
            cpf,
            endereco,
            new Date()
        );
        return await this._repository.update(id, cliente);
    }
}
