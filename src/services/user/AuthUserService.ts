import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
  cnpj: string;
  password: string;
}

class AuthUserService {
  async execute({ cnpj, password }: AuthRequest) {
    // Verifica se o cnpj existe no banco de dados.
    const user = await prismaClient.user.findFirst({
      where: {
        cnpj: cnpj,
      },
    });

    if (!user) {
      throw new Error("Usuario ou senha incorreto");
    }

    // Verifica se a senha que ele mandou está correta.
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Usuário ou senha incorreto");
    }

    // Se passou das validações gera o token pro usuario
    const token = sign(
      {
        cnpj: user.cnpj,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    );

    return {
      id: user.id,
      categoria: user.categoria,
      cnpj: user.cnpj,
      email: user.email,
      token: token,
    };
  }
}

export { AuthUserService };
