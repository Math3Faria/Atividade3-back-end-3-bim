import { Request, Response } from "express";
import { CategoriaService } from "../services/categoria.service";

export class CategoriaController {
    constructor(private _service = new CategoriaService()) { }

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const categorias = await this._service.selecionarTodos();
            res.status(200).json({ categorias })
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
            const { descricaoCategoria } = req.body;
            const vinculoImagem = req.file ? req.file.filename : undefined;
            if (!vinculoImagem) {
                return res.status(400).json({ message: "Voce precisa vincular uma imagem à categoria" });
            }

            const novo = await this._service.criar(descricaoCategoria, vinculoImagem);
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
            const { descricaoCategoria } = req.body;
            const id = Number(req.query.id);
            const vinculoImagem = req.file ? req.file.filename : undefined;

            const alterado = await this._service.editar(id, descricaoCategoria, vinculoImagem);
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
            const idCategoria = Number(req.query.idCategoria)
            const deletado = await this._service.deletar(idCategoria);
            if (deletado.affectedRows === 0 || (Array.isArray(deletado) && deletado.length === 0)) {
                return res.status(404).json({ message: "Categoria nao encontrada" });
            }
            res.status(200).json({ deletado })
        } catch (error: unknown) {
            if (typeof error === 'object' && error !== null && 'code' in error) {
                const err = error as { code?: string };
                if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                    return res.status(400).json({ message: 'Não é possível excluir a categoria pois existem produtos vinculados.' })
                }
            }
            if (error instanceof Error) {

                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }

    selecionaById = async (req: Request, res: Response) => {
        try {
            const id = Number(req.query.id)
            if (!id || id <= 0) {
                throw new Error("O id para deve ser um número válido");
            }
            const categoriasPorId = await this._service.selecionaById(id);
            res.status(200).json({ categoriasPorId })
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }
}
