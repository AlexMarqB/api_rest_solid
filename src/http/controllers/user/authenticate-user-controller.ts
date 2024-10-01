import { makeAuthenticateUserUseCase } from "@/use-cases/@factories/make-authenticate-usecases";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticateUserController(
	req: FastifyRequest,
	rep: FastifyReply
) {
	const authenticateUserSchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	});

	const { email, password } = authenticateUserSchema.parse(req.body);

	try {
		const authUserUseCase = makeAuthenticateUserUseCase();

		const { user } = await authUserUseCase.execute({ email, password });

		const token = await rep.jwtSign({
			role: user.role,
		}, {
			sign: { sub: user.id },
		});

		const refreshToken = await rep.jwtSign({
			role: user.role,
		}, {
			sign: { 
				sub: user.id,
				expiresIn: '7d' // se o user não acessar o app em 7 dias, ele terá que logar novamente
			 },
		});
        
        return rep
		.setCookie("refreshToken", refreshToken, {
			path: "/", //quais rotas terão acesso ao cookie
			secure: true, // só aceita requisições https
			sameSite: true, // só aceita requisições do mesmo site
			httpOnly: true, // só aceita requisições da api não fica salvo no browser
		})
		.status(200)
		.send({token});
	} catch (error) {
		throw error;
	}

}
