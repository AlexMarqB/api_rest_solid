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

		const token = await rep.jwtSign({}, {
			sign: { sub: user.id },
		});
        
        return rep.status(200).send({token});
	} catch (error) {
		throw error;
	}

}
