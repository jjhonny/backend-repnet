import { Request, Response } from "express";
import { ListProductService } from "../../services/user/ListProductService";

class ListProductController {
  async handle(req: Request, res: Response) {
    const listProductService = new ListProductService();
    let produtos = [];
    try {
      produtos = await listProductService.execute();
      if (produtos.length < 1) {
        return res.status(200).json({ produtos: [] });
      }
    } catch (e) {
      return res.status(500).json({ error: "Ocorreu um erro interno " });
    }

    return res.json({ produtos: produtos });
  }
}

export { ListProductController };
