import { Request, Response } from "express";
import { ProdutoService } from "../services/produto.service";


export class ProdutoController {
    constructor(private _service = new ProdutoService()) { }

    selecionarTodos = async (req: Request, res: Response) => {
        try {
            const produtos = await this._service.selecionarTodos();
            res.status(200).json({ produtos })
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
            const { nomeProduto, valorProduto, idCategoria } = req.body;
            const vinculoImagem = req.file ? req.file.filename : undefined;
            const novo = await this._service.criar(
                nomeProduto,
                Number(valorProduto),
                Number(idCategoria),
                vinculoImagem
            );

            res.status(201).json({ novo });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    }

    editar = async (req: Request, res: Response) => {
        try {
            const { nomeProduto, valorProduto, idCategoria } = req.body;
            const idProduto = Number(req.query.idProduto);
            const vinculoImagem = req.file ? req.file.filename : undefined;
            const alterado = await this._service.editar(
                idProduto,
                nomeProduto,
                Number(valorProduto),
                Number(idCategoria),
                vinculoImagem
            );

            res.status(200).json({ alterado });
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' });
        }
    }

    deletar = async (req: Request, res: Response) => {
        try {
            const idProduto = Number(req.query.idProduto)
            const deletado = await this._service.deletar(idProduto);
            if (deletado.affectedRows === 0 || (Array.isArray(deletado) && deletado.length === 0)) {
                return res.status(404).json({ message: "Categoria nao encontrada" });
            }

            res.status(200).json({ deletado })
        } catch (error: unknown) {
            if (typeof error === 'object' && error !== null && 'code' in error) {
                const err = error as { code?: string };

                if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                    return res.status(400).json({
                        message: 'Não foi possível salvar: o ID do Pedido ou do Produto informado não existe.'
                    });
                }

                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({
                        message: 'Este produto já foi adicionado a este pedido.'
                    });
                }
            }

            if (error instanceof Error) {
                return res.status(400).json({
                    message: 'Ocorreu um erro na validação',
                    errorMessage: error.message
                });
            }

            res.status(500).json({message: 'Ocorreu um erro inesperado no servidor',errorMessage: 'Erro desconhecido'});
        }

    }

    selecionaById = async (req: Request, res: Response) => {
        try {
            const idProduto = Number(req.query.idProduto)
            const produtosPorId = await this._service.selecionaById(idProduto);
            
            if (!produtosPorId || !idProduto || idProduto <= 0) {
                throw new Error("O id para deve ser um número válido ou existente");
            }

            res.status(200).json({ produtosPorId })
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })
            }
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: 'Erro desconhecido' })
        }
    }
}
