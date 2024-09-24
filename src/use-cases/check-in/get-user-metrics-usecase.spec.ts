import {beforeEach, describe, expect, it} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkIns-repository'
import { GetUserMetricsUseCase } from './get-user-metrics-usecase'

let checkInRepository: InMemoryCheckInsRepository
//System under test
let sut: GetUserMetricsUseCase

describe('Get User Check-in Count UseCase', () => {
    //Unit Test

    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInsRepository()
        sut = new GetUserMetricsUseCase(checkInRepository)
    })

    it("Should be able to get check-in count", async () => {
        await checkInRepository.create({
            gym_id: "gym-01",
            user_id: "user-01",
        })

        await checkInRepository.create({
            gym_id: "gym-02",
            user_id: "user-01",
        })
        
        const {checkInsCount} = await sut.execute({
            userId: "user-01"
        });

        expect(checkInsCount).toEqual(2)
    })
})