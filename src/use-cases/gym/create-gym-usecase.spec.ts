import {beforeEach, describe, expect, it} from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym-usecase'

let gymsRepository: InMemoryGymsRepository
//System under test
let sut: CreateGymUseCase

describe('Create User UseCase', () => {
    //Unit Test

    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(gymsRepository)
    })

    it("Should be able to create a new gym", async () => {
        const { gym } = await sut.execute({
            title: "John Doe gym",
            description: null,
            phone: null,
            latitude: -20.5375169,
            longitude: -47.4000366
        })

        expect(gym.id).toEqual(expect.any(String))
    })
})