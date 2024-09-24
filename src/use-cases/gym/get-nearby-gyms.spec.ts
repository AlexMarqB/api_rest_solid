import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'
import { _bcrypt } from '@/lib/bcrypt'
import { GetGymsUseCase } from './get-gyms-usecase'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { GetNearbyGymsUseCase } from './get-nearby-gyms'

let gymRepository: InMemoryGymsRepository
//System under test
let sut: GetNearbyGymsUseCase

describe('Get Gyms UseCase', () => {
    //Unit Test

    beforeEach(async () => {
        gymRepository = new InMemoryGymsRepository()
        sut = new GetNearbyGymsUseCase(gymRepository)
    })

    it("Should be able to get nearby gyms", async () => {
        const myLocation = {
            longitude: -20.5362031,
            latitude: -47.394482
        }

        await gymRepository.create({
            title: 'Near Gym',
            description: null,
            phone: null,
            longitude: -20.5362031,
            latitude: -47.394482
        })

        await gymRepository.create({
            title: 'Far Gym',
            description: null,
            phone: null,
            latitude: -20.7355202,
            longitude: -46.5973104
        })
        
        const { gyms } = await sut.execute({
            userLatitude: myLocation.latitude,
            userLongitude: myLocation.longitude
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({
                title: 'Near Gym'
            })
        ])
    })
})