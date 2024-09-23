import { UsersRepository } from "@/repositories/users-repository";
import { _bcrypt } from "@/lib/bcrypt";
import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

export interface CheckInUseCaseRequest {
	userId: string;
	gymId: string;
	userLatitude: number;
	userLongitude: number;
}

export interface CheckInUseCaseResponse {
	checkIn: CheckIn;
}

export class CheckInUserUseCase {
	constructor(
		private checkInRepository: CheckInsRepository,
		private gymsRepository: GymsRepository
	) {}

	async execute({
		userId,
		gymId,
		userLatitude,
		userLongitude,
	}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
		const gym = await this.gymsRepository.findyById(gymId);

		if (!gym) {
			throw new ResourceNotFoundError();
		}

		// TODO: Calcular a distancia entre o usuario e a academia, se a distancia for maior que 100m, lançar um erro

		const distance = getDistanceBetweenCoordinates(
			{ latitude: userLatitude, longitude: userLongitude },
			{
				latitude: gym.latitude.toNumber(),
				longitude: gym.longitude.toNumber(),
			}
		);

        const MAX_DISTANCE_IN_KILOMETERS = 0.1;
        
        if (distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new Error();
        }


		const checkInOnSameDate = await this.checkInRepository.findByUserIdOnDate(
			userId,
			new Date()
		);

		if (checkInOnSameDate) {
			throw new Error();
		}

		const checkIn = await this.checkInRepository.create({
			gym_id: gymId,
			user_id: userId,
		});

		return {
			checkIn,
		};
	}
}
