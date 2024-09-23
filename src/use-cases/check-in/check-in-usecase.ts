import { UsersRepository } from "@/repositories/users-repository";
import { _bcrypt } from "@/lib/bcrypt";
import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";


export interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
}

export interface CheckInUseCaseResponse {
    checkIn: CheckIn;
}


export class CheckInUserUseCase {
    constructor(
        private checkInRepository: CheckInsRepository
    ) {}

    async execute({userId, gymId}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const checkIn = await this.checkInRepository.create({
            gym_id: gymId,
            user_id: userId,
        })

        return {
            checkIn
        }
    }
}