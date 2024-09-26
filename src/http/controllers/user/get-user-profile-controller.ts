import { FastifyReply, FastifyRequest } from "fastify";

export async function getUserProfileController(req: FastifyRequest, rep: FastifyReply) {

    return rep.status(200).send()
}