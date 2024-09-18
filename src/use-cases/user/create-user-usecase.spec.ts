import {describe, expect, it} from 'vitest'
import { CreateUserUseCase } from './create-user-usecase'
import bcrypt from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

describe('Create User UseCase', () => {
    //Unit Test

    it("Should be able to create a new user", async () => {
        const usersRepository = new InMemoryUsersRepository()
        const createUserUseCase = new CreateUserUseCase(usersRepository)

        const { user } = await createUserUseCase.execute({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "123456"
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it("Should hash user password upon registration", async () => {
        const usersRepository = new InMemoryUsersRepository()
        const createUserUseCase = new CreateUserUseCase(usersRepository)

        const { user } = await createUserUseCase.execute({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "123456"
        })

        const isPasswordHashValid = await bcrypt.compare("123456", user.password_hash)

        expect(isPasswordHashValid).toBe(true)
    })

    it("Should not allow two users with the same email", async () => {
        const usersRepository = new InMemoryUsersRepository()
        const createUserUseCase = new CreateUserUseCase(usersRepository)

        const email = "johndoe@example.com"

        await createUserUseCase.execute({
            name: "John Doe",
            email,
            password: "123456"
        })

        expect(() => createUserUseCase.execute({
            name: "John Doe",
            email,
            password: "123456"
        })).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})