import { CheckInsRepository } from "@/repositories/check-ins-repository";

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
