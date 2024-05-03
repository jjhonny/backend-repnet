import { Request, Response } from "express";
import { CreateProductService } from "../../services/user/CreateProductService";
import { Produto } from "@prisma/client";

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { descricao, validade, peso, preco, categoria, marca } = req.body;
    let product: {
      id: number;
      descricao: string;
      validade: string;
      peso: number;
      preco: number;
      id_cat: number;
      id_marca: number;
    };
    if (!descricao) {
      return res.status(400).json({ error: "Descrição é obrigatório !" });
    }

    const createProductService = new CreateProductService();
    try {
      product = await createProductService.execute({
        descricao,
        validade,
        peso,
        preco,
        categoria,
        marca,
      });
    } catch (e) {
      console.log(`error ${e}`);
      return res.status(500).json({ error: "Erro desconhecido" });
    }

    return res.json(product);
  }
}

export { CreateProductController };
