import fastify from "fastify";
import { userRoutes } from "./http/controllers/user/routes";
import { ZodError } from "zod";
import { env } from "./env";
import { InvalidCredentialsError } from "./use-cases/@errors/invalid-credentials-error";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { gymRoutes } from "./http/controllers/gym/routes";
import { checkInSRoutes } from "./http/controllers/check-ins/routes";

const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: "refreshToken",
        signed: false
    },
    sign: {
        expiresIn: "10m" // a cada 10 minutos verifico se o user tem o refreshToken para renovar o token principal
    }
})

app.register(fastifyCookie)

app.register(userRoutes)

app.register(gymRoutes)

app.register(checkInSRoutes)

app.setErrorHandler(async (error, _, rep) => {
    if (error instanceof ZodError) {
        return rep.status(400).send({ message: "Validation error.", issues: error.format() })
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