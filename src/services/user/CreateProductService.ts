import prismaClient from "../../prisma";

interface UserRequest {
  //Cria a interface de como deve ser a estrutura dos dados para criação de um produto
  descricao: string;
  validade: string;
  peso: number;
  preco: number;
  categoria: string;
  marca: string;
}

class CreateProductService {
  async execute({
    descricao,
    validade,
    peso,
    preco,
    categoria,
    marca,
  }: UserRequest) {
    let categoriaVerify = await prismaClient.categoriaProduto.findFirst({
      where: {
        descricao: categoria,
      },
    });

    if (!categoriaVerify) {
      await prismaClient.categoriaProduto.create({
        data: {
          descricao: categoria,
        },
      });
      categoriaVerify = await prismaClient.categoriaProduto.findFirst({
        where: {
          descricao: categoria,
        },
      });
    }

    let marcaVerify = await prismaClient.marca.findFirst({
      where: {
        razao_social: marca,
      },
    });

    if (!marcaVerify) {
      await prismaClient.marca.create({
        data: {
          razao_social: marca,
        },
      });

      marcaVerify = await prismaClient.marca.findFirst({
        where: {
          razao_social: marca,
        },
      });
    }

    const productAlreadyExists = await prismaClient.produto.findFirst({
      where: {
        descricao: descricao,
        validade: validade,
        peso: peso,
        preco: preco,
        id_cat: categoriaVerify.id,
        id_marca: marcaVerify.id,
      },
    });

    if (productAlreadyExists) {
      console.log("aqui onde não deveria");
      throw new Error("Produto já existe.");
    }

    const newProduct = await prismaClient.produto.create({
      data: {
        descricao: descricao,
        validade: validade,
        peso: peso,
        preco: preco,
        id_cat: categoriaVerify.id,
        id_marca: marcaVerify.id,
      },
    });

    return newProduct;
  }
}

export { CreateProductService };
