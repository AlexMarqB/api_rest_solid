import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUserUseCase } from "../auth/authenticate-user-usecase";

const usersRepository = new PrismaUsersRepository();

export function makeAuthenticateUserUseCase() {
	const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);

	return authenticateUserUseCase;
}