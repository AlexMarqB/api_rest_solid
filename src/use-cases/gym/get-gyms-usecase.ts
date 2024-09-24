import { GymsRepository } from "@/repositories/gyms-repository"
import { Gym } from "@prisma/client"

interface GetGymsUseCaseRequest {
    query: string,
    page: number
}

interface GetGymsUseCaseResponse {
    gyms: Gym[]
}

export class GetGymsUseCase {
    constructor(private gymsRepository: GymsRepository) {}

    async execute({
        query,
        page
    }: GetGymsUseCaseRequest): Promise<GetGymsUseCaseResponse> {
        const gyms = await this.gymsRepository.searchMany(query, page)
        
        return {
            gyms
        }
    }
}