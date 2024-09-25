import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { CreateUserUseCase } from "../user/create-user-usecase";

export function makeCreateUserUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const createUserUseCase = new CreateUserUseCase(usersRepository);

	return createUserUseCase;
}