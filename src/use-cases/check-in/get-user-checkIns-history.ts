import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

export interface GetUserCheckInsHistoryUseCaseRequest {
	userId: string;
	page: number;
}

export interface GetUserCheckInsHistoryUseCaseResponse {
	checkIns: CheckIn[];
}
''
export class GetUserCheckInsHistoryUseCase {
	constructor(
		private checkInRepository: CheckInsRepository
	) {}

	async execute({
		userId,
		page
	}: GetUserCheckInsHistoryUseCaseRequest): Promise<GetUserCheckInsHistoryUseCaseResponse> {
		const checkIns = await this.checkInRepository.findyManyByUserId(userId, page);

		if(!checkIns) {
			throw new ResourceNotFoundError();
		}

		return {
			checkIns
		};
	}
}
