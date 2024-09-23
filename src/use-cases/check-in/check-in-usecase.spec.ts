import {beforeEach, describe, expect, it} from 'vitest'
import { _bcrypt } from '@/lib/bcrypt'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkIns-repository'
import { CheckInUserUseCase } from './check-in-usecase'

let checkInRepository: InMemoryCheckInsRepository
//System under test
let sut: CheckInUserUseCase

describe('Check-in UseCase', () => {
    //Unit Test

    beforeEach(() => {
        checkInRepository = new InMemoryCheckInsRepository()
        sut = new CheckInUserUseCase(checkInRepository)
    })

    it("Should be able to check in", async () => {
        const { checkIn } = await sut.execute({
            userId: "user-id",
            gymId: "gym-id"
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})