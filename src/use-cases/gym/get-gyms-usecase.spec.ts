import {beforeEach, describe, expect, it} from 'vitest'
import { GetGymsUseCase } from './get-gyms-usecase'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymRepository: InMemoryGymsRepository
//System under test
let sut: GetGymsUseCase

describe('Get Gyms UseCase', () => {
    //Unit Test

    beforeEach(async () => {
        gymRepository = new InMemoryGymsRepository()
        sut = new GetGymsUseCase(gymRepository)
    })

    it("Should be able to get gyms", async () => {
        await gymRepository.create({
            title: 'Javascript Gym',
            description: null,
            phone: null,
            latitude: -20.5375169,
            longitude: -47.4000366
        })

        await gymRepository.create({
            title: 'Python Gym',
            description: null,
            phone: null,
            latitude: -20.5375169,
            longitude: -47.4000366
        })
        
        const { gyms } = await sut.execute({
            query: "Javascript",
            page: 1,
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({
                title: "Javascript Gym"
            }),
        ])
    })

    it("Should be able to get a paginated gyms list", async () => {
        for (let i = 1; i <= 22; i++) {
            await gymRepository.create({
                title: `Gym ${i}`,
                description: null,
                phone: null,
                latitude: -20.5375169,
                longitude: -47.4000366
            })
        }
        
        const { gyms } = await sut.execute({
            query: "",
            page: 2,
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({
                title: `Gym 21`
            }),
            expect.objectContaining({
                title: `Gym 22`
            })
        ])
    })
})