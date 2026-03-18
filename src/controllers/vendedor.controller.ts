import { Request, Response } from "express";
import { VendedorService } from "../services/vendedor.service";

export class VendedorController {
    constructor(private _service = new VendedorService()) { }

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const vendedores = await this._service.selecionarTodos();
            res.status(200).json({ vendedores });
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
            const { idVendedor, nome, email, matricula } = req.body;
            const novo = await this._service.criar(idVendedor, nome, email, Number(matricula));


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
            const { nome, email, matricula } = req.body;
            const idVendedor = Number(req.query.idVendedor);
            const alterado = await this._service.editar(idVendedor, matricula, nome, email);
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
            const idVendedor = Number(req.query.idVendedor);

            if (!idVendedor || idVendedor <= 0 || isNaN(idVendedor)) {
                return res.status(400).json({ message: "O id deve ser um número válido" });
            }

            const deletado = await this._service.deletar(idVendedor);

            if (deletado.affectedRows === 0) {
                return res.status(404).json({ message: "Vendedor não encontrado" });
            }

            return res.status(200).json({ message: "Excluído com sucesso", deletado });

        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                if ((error as any).code === 'ER_ROW_IS_REFERENCED_2') {
                    return res.status(400).json({ message: "Não é possível excluir pois este vendedor possui registros vinculados." });
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

            const vendedorPorId = await this._service.selecionaById(id);
            if (!vendedorPorId) {
                return res.status(404).json({ message: "Vendedor não encontrado" });
            }
            res.status(200).json({ vendedorPorId });
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }
}
