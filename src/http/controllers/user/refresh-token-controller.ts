import { FastifyReply, FastifyRequest } from "fastify";

export async function refreshTokenController(
	req: FastifyRequest,
	rep: FastifyReply
) {
	await req.jwtVerify({ onlyCookie: true }); // verifica se o user está autenticado mas não vai buscar os dados no Header do request e sim no cookie

	const token = await rep.jwtSign(
		{},
		{
			sign: { sub: req.user.sub },
		}
	);

	const refreshToken = await rep.jwtSign(
		{},
		{
			sign: {
				sub: req.user.sub,
				expiresIn: "7d", // se o user não acessar o app em 7 dias, ele terá que logar novamente
			},
		}
	);

	return rep
		.setCookie("refreshToken", refreshToken, {
			path: "/", //quais rotas terão acesso ao cookie
			secure: true, // só aceita requisições https
			sameSite: true, // só aceita requisições do mesmo site
			httpOnly: true, // só aceita requisições da api não fica salvo no browser
		})
		.status(200)
		.send({ token });
}
