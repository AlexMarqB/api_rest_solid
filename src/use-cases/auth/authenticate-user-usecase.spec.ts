import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { _bcrypt } from "@/lib/bcrypt";
import { AuthenticateUserUseCase } from "./authenticate-user-usecase";
import { InvalidCredentialsError } from "../@errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
//System under test
let sut : AuthenticateUserUseCase;

describe("Authenticate User UseCase", () => {
	//Unit Test
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new AuthenticateUserUseCase(usersRepository);
	})

	it("Should be able to auth an user", async () => {
		// Se utilizarmos o createUserUseCase iremos testar mais de 1 use case, e não devemos fazer isso então
		// Como temos acesso ao repositorio podemos criar diretamente nele um usuário para teste

		await usersRepository.create({
			name: "John Doe",
			email: "johndoe@example.com",
			password_hash: await _bcrypt.hash("123456", 6),
		});

		const { user } = await sut.execute({
			email: "johndoe@example.com",
			password: "123456",
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it("Should not be able to authenticate with wrong email", async () => {
		await expect(() =>
			sut.execute({
				email: "johndoe@example.com",
				password: "123456",
			})
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it("Should be able to auth an user", async () => {
		// Se utilizarmos o createUserUseCase iremos testar mais de 1 use case, e não devemos fazer isso então
		// Como temos acesso ao repositorio podemos criar diretamente nele um usuário para teste

		await usersRepository.create({
			name: "John Doe",
			email: "johndoe@example.com",
			password_hash: await _bcrypt.hash("123456", 6),
		});

		await expect(() =>
			sut.execute({
				email: "johndoe@example.com",
				password: "123123",
			})
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
});
