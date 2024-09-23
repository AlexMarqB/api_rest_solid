import {beforeEach, describe, expect, it} from 'vitest'
import { CreateUserUseCase } from './create-user-usecase'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { _bcrypt } from '@/lib/bcrypt'

let usersRepository: InMemoryUsersRepository
//System under test
let sut: CreateUserUseCase

describe('Create User UseCase', () => {
    //Unit Test

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new CreateUserUseCase(usersRepository)
    })

    it("Should be able to create a new user", async () => {
        

        const { user } = await sut.execute({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "123456"
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it("Should hash user password upon registration", async () => {
        const { user } = await sut.execute({
            name: "John Doe",
            email: "johndoe@example.com",
            password: "123456"
        })

        const isPasswordHashValid = await _bcrypt.compare("123456", user.password_hash)

        expect(isPasswordHashValid).toBe(true)
    })

    it("Should not allow two users with the same email", async () => {
        const email = "johndoe@example.com"

        await sut.execute({
            name: "John Doe",
            email,
            password: "123456"
        })

        await expect(() => sut.execute({
            name: "John Doe",
            email,
            password: "123456"
        })).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})