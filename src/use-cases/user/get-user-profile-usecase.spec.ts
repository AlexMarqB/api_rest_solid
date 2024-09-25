import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { _bcrypt } from "@/lib/bcrypt";
import { GetUserProfileUseCase } from "./get-user-profile-usecase";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
//System under test
let sut: GetUserProfileUseCase;

describe("Get User Profile UseCase", () => {
	//Unit Test

	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new GetUserProfileUseCase(usersRepository);
	});

	it("Should be able to find an user by its Id", async () => {
		const createdUser = await usersRepository.create({
			name: "John Doe",
			email: "johndoe@example.com",
			password_hash: await _bcrypt.hash("123456", 6),
		});

		const { user } = await sut.execute({
			userId: createdUser.id,
		});

		expect(user.name).toEqual("John Doe");
	});

	it("Should not be able to get user profile with wrong id", async () => {
		await expect(() =>
			sut.execute({
				userId: "non-existing-id",
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
