import { Request, Response } from "express";
import { ClienteService } from "../services/cliente.service";

export class ClienteController {
    constructor(private _service = new ClienteService()) { }

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const clientes = await this._service.selecionarTodos();
            res.status(200).json({ clientes });
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }

    criar = async (req: Request, res: Response) => {
        try {
            const { idCliente, nome, email, cpf, endereco } = req.body;
            const novo = await this._service.criar(idCliente, nome, email, cpf, endereco);
            res.status(201).json({ novo });
       } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }

    editar = async (req: Request, res: Response) => {
        try {
            const { nome, email, cpf, endereco } = req.body;
            const idCliente = Number(req.query.id);
            const alterado = await this._service.editar(idCliente, nome, email, cpf, endereco);
            res.status(200).json({ alterado });
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }

    deletar = async (req: Request, res: Response) => {
        try {
            const idCliente = Number(req.query.idCliente);

            if (!idCliente || idCliente <= 0 || isNaN(idCliente)) {
                return res.status(400).json({ message: "O id deve ser um número válido" });
            }

            const deletado = await this._service.deletar(idCliente);

            if (deletado.affectedRows === 0) {
                return res.status(404).json({ message: "Registro não encontrado" });
            }

            return res.status(200).json({ message: "Excluído com sucesso", deletado });

        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                if ((error as any).code === 'ER_ROW_IS_REFERENCED_2') {
                    return res.status(400).json({ message: "Não é possível excluir pois este cliente possui registros vinculados." });
                }
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            return res.status(500).json({ message: 'Ocorreu um erro no servidor' });
        }
    }

    selecionaById = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id);
            if (!id || id <= 0 || isNaN(id)) {
                return res.status(400).json({ message: "O id deve ser um número válido" });
            }

            const clientePorId = await this._service.selecionaById(id);
            if (!clientePorId) {
                return res.status(404).json({ message: "Cliente não encontrado" });
            }
            res.status(200).json({ clientePorId });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    }
}
