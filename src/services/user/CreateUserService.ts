import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { Categoria } from "@prisma/client";

interface UserRequest {
  categoria: Categoria;
  shopname: string;
  cnpj: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ categoria, shopname, cnpj, email, password }: UserRequest) {
    // Verifica se ele enviou um email
    if (!email) {
      throw new Error("Email incorrect");
    }

    // Verifica se esse email já está cadastrado na plataforma
    const emailAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (emailAlreadyExists) {
      throw new Error("Este email já está cadastrado");
    }

    // Verifica se ele enviou um cnpj
    if (!cnpj) {
      throw new Error("CNPJ incorrect");
    }

    // Verifica se o CNPJ já está cadastrado
    const cnpjAlreadyExists = await prismaClient.user.findFirst({
      where: {
        cnpj: cnpj,
      },
    });

    if (cnpjAlreadyExists) {
      throw new Error("Este CNPJ já está cadastrado");
    }

    const passwordHash = await hash(password, 8);

    // Cria o usuario
    const user = await prismaClient.user.create({
      data: {
        categoria: categoria,
        shopname: shopname,
        cnpj: cnpj,
        email: email,
        password: passwordHash,
      },
      select: {
        id: true,
        categoria: true,
        shopname: true,
        cnpj: true,
        email: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
