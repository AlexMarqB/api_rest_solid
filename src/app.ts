import fastify from "fastify";
import { userRoutes } from "./http/controllers/routes";
import { ZodError } from "zod";
import { UserAlreadyExistsError } from "./use-cases/@errors/user-already-exists-error";
import { env } from "./env";
import { InvalidCredentialsError } from "./use-cases/@errors/invalid-credentials-error";

const app = fastify()

app.register(userRoutes)

app.setErrorHandler(async (error, _, rep) => {
    if (error instanceof ZodError) {
        return rep.status(400).send({ message: "Validation error.", issues: error.format() })
    }

    if(error instanceof UserAlreadyExistsError) {
        return rep.status(409).send({ message: error.message })
    }

    if (error instanceof InvalidCredentialsError) {
        return rep.status(400).send({ message: error.message})
    }

    if(env.NODE_ENV !== "production") {
        console.error(error)
    } else {
        // TODO: Here we could log the error in a tool like DataDog, Sentry, etc.
    }

    return rep.status(500).send({ message: "Internal server error." })
})

export default app;