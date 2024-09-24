import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'
import { _bcrypt } from '@/lib/bcrypt'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkIns-repository'
import { CheckInUserUseCase } from './create-check-in-usecase'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from '../errors/max-number-of-check-ins'
import { MaxDistanceError } from '../errors/max-distance-error'

let checkInRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
//System under test
let sut: CheckInUserUseCase

describe('Check-in UseCase', () => {
    //Unit Test

    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUserUseCase(checkInRepository, gymsRepository)

        await gymsRepository.create({
            id: 'gym-01',
            title: "JS Gym",
            description: "The best gym in the world",
            phone: "123456789",
            // TODO: Melhorar a resolução do tipo Decimal
            latitude: 0,
            longitude: 0,
        })

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
            gymId: "gym-01",
            userLatitude: 0,
            userLongitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it("Should not be able to check in twice in the same day", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        // const chekcInOnSameDay = await sut.check

        await sut.execute({
            gymId: "gym-01",
            userId: "user-id",
            userLatitude: 0,
            userLongitude: 0
        })

        await expect(() => sut.execute({
            gymId: "gym-01",
            userId: "user-id",
            userLatitude: 0,
            userLongitude: 0
        })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
    })

    it("Should not be able to check in twice but in different days", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        // const chekcInOnSameDay = await sut.check

        await sut.execute({
            gymId: "gym-01",
            userId: "user-id",
            userLatitude: 0,
            userLongitude: 0
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

        const {checkIn} = await  sut.execute({
            gymId: "gym-01",
            userId: "user-id",
            userLatitude: 0,
            userLongitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it("Should not be able to check in on distant gym", async () => {

        gymsRepository.items.push({
            id: 'gym-02',
            title: "JS Gym",
            description: "The best gym in the world",
            // TODO: Melhorar a resolução do tipo Decimal
            latitude: new Decimal(-20.4861255),
            longitude: new Decimal(47.3286641),
            phone: "123456789",
        })
        
        await expect(() => sut.execute({
            userId: "user-id",
            gymId: "gym-02",
            userLatitude: -20.5375169,
            userLongitude: -47.4000366
        })).rejects.toBeInstanceOf(MaxDistanceError)
    })
})