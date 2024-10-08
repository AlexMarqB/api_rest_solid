import {beforeEach, describe, expect, it} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkIns-repository'
import { GetUserCheckInsHistoryUseCase } from './get-user-check-ins-history-usecase'

let checkInRepository: InMemoryCheckInsRepository
//System under test
let sut: GetUserCheckInsHistoryUseCase

describe('Get User Check-in History UseCase', () => {
    //Unit Test

    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInsRepository()
        sut = new GetUserCheckInsHistoryUseCase(checkInRepository)
    })

    it("Should be able to get check-in history", async () => {
        await checkInRepository.create({
            gym_id: "gym-01",
            user_id: "user-01",
        })

        await checkInRepository.create({
            gym_id: "gym-02",
            user_id: "user-01",
        })
        
        const { checkIns } = await sut.execute({
            userId: "user-01",
            page: 1
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({
                gym_id: "gym-01"
            }),
            expect.objectContaining({
                gym_id: "gym-02"
            })
        ])
    })

    it("Should be able to get a paginated check-in history", async () => {
        for (let i = 1; i <= 22; i++) {
            await checkInRepository.create({
                gym_id: `gym-${i}`,
                user_id: "user-01",
            })
        }
        
        const { checkIns } = await sut.execute({
            userId: "user-01",
            page: 2,
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({
                gym_id: "gym-21"
            }),
            expect.objectContaining({
                gym_id: "gym-22"
            })
        ])
    })
})