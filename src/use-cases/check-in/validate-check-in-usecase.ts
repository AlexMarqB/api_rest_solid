import { _bcrypt } from "@/lib/bcrypt";
import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxDistanceError } from "../@errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "../@errors/max-number-of-check-ins";
import dayjs from "dayjs";
import { TimeLimitExpired } from "../@errors/max-time-to-validate-error";

export interface ValidateCheckInUseCaseRequest {
	checkInId: string;
}

export interface ValidateCheckInUseCaseResponse {
	checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
	constructor(private checkInRepository: CheckInsRepository) {}

	async execute({
		checkInId,
	}: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
		const checkIn = await this.checkInRepository.findById(checkInId);

		if (!checkIn) {
			throw new ResourceNotFoundError();
		}

		// Data atual - data de criação do check-in
		const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
			checkIn.created_at,
			"minute"
		);

		if(distanceInMinutesFromCheckInCreation > 20) {
			throw new TimeLimitExpired();
		}

		checkIn.validated_at = new Date();

		await this.checkInRepository.save(checkIn);

		return {
			checkIn,
		};
	}
}
