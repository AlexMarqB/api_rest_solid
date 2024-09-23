import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUserUseCase } from "../auth/authenticate-user-usecase";

export function makeAuthenticateUserUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);

	return authenticateUserUseCase;
}