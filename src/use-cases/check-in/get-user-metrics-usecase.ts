import { UsersRepository } from "@/repositories/users-repository";
import { _bcrypt } from "@/lib/bcrypt";
import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxDistanceError } from "../errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "../errors/max-number-of-check-ins";

export interface GetUserMetricsRequest {
	userId: string;
}

export interface GetUserMetricsResponse {
	checkInsCount: number;
}

export class GetUserMetricsUseCase {
	constructor(
		private checkInRepository: CheckInsRepository,
	) {}

	async execute({
		userId
	}: GetUserMetricsRequest): Promise<GetUserMetricsResponse> {
		const checkInsCount = await this.checkInRepository.countByUserId(userId);

        return {
            checkInsCount
        }
	}
}
