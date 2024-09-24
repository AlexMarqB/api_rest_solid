import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'
import { _bcrypt } from '@/lib/bcrypt'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkIns-repository'
import { CheckInUserUseCase } from './create-check-in-usecase'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from '../errors/max-number-of-check-ins'
import { MaxDistanceError } from '../errors/max-distance-error'
import { GetUserCheckInsHistoryUseCase } from './get-user-checkIns-history-usecase'
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