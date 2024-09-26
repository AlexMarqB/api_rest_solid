import { makeGetUserProfileUseCase } from "@/use-cases/@factories/make-user-usecases";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getUserProfileController(req: FastifyRequest, rep: FastifyReply) {
    const getUserProfile = makeGetUserProfileUseCase()

    const {user} = await getUserProfile.execute({userId: req.user.sub})

    return rep.status(200).send({
        user: {
            ...user, // pegamos todas as props do user
            password_hash: undefined // removemos a propriedade password_hash
        }
    })
}