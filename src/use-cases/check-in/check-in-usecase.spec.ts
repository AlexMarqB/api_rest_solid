import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'
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

        //Gera o mocking
        vi.useFakeTimers()
    })

    afterEach(() => {
        //Reverte o mocking
        vi.useRealTimers()
    })

    it("Should be able to check in", async () => {
        const { checkIn } = await sut.execute({
            userId: "user-id",
            gymId: "gym-id"
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it("Should not be able to check in twice in the same day", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        // const chekcInOnSameDay = await sut.check

        await sut.execute({
            gymId: "gym-id",
            userId: "user-id"
        })

        await expect(() => sut.execute({
            gymId: "gym-id",
            userId: "user-id"
        })).rejects.toBeInstanceOf(Error)
    })

    it("Should not be able to check in twice but in different days", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        // const chekcInOnSameDay = await sut.check

        await sut.execute({
            gymId: "gym-id",
            userId: "user-id"
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

        const {checkIn} = await  sut.execute({
            gymId: "gym-id",
            userId: "user-id"
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})