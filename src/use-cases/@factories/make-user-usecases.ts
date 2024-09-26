import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { CreateUserUseCase } from "../user/create-user-usecase";
import { GetUserProfileUseCase } from "../user/get-user-profile-usecase";

const usersRepository = new PrismaUsersRepository();

export function makeCreateUserUseCase() {
	const createUserUseCase = new CreateUserUseCase(usersRepository);

	return createUserUseCase;
}

export function makeGetUserProfileUseCase () {
	const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);

	return getUserProfileUseCase;
}