import { makeCreateGymUseCase } from "@/use-cases/@factories/make-gym-usecases";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createGymController(
	req: FastifyRequest,
	rep: FastifyReply
) {
	const createGymSchema = z.object({
		title: z.string(),
		description: z.string().nullable(),
		latitude: z.number().refine((value) => Math.abs(value) <= 90),
		longitude: z.number().refine((value) => Math.abs(value) <= 180),
		phone: z.string().nullable(),
	});

	const { title, description, phone, latitude, longitude } =
		createGymSchema.parse(req.body);

	const createUserUseCase = makeCreateGymUseCase();

	await createUserUseCase.execute({
		title,
		description,
		phone,
		latitude,
		longitude,
	});

	return rep.status(201).send();
}
