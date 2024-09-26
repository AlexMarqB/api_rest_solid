import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-checkIn-repository";
import { CreateCheckInUserUseCase } from "../check-in/create-check-in-usecase";
import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { GetUserCheckInsHistoryUseCase } from "../check-in/get-user-check-ins-history-usecase";
import { GetUserMetricsUseCase } from "../check-in/get-user-metrics-usecase";
import { ValidateCheckInUseCase } from "../check-in/validate-check-in-usecase";

const checkInRepository = new PrismaCheckInsRepository();
const gymRepository = new PrismaGymRepository();

export function makeCreateCheckInUseCase() {
    const createCheckInUseCase = new CreateCheckInUserUseCase(checkInRepository, gymRepository);

    return createCheckInUseCase;
}

export function makeGetUserCheckInHistoryUseCasse () {
    const getUserCheckInHistoryUseCase = new GetUserCheckInsHistoryUseCase(checkInRepository);

    return getUserCheckInHistoryUseCase;
}

export function makeGetUserMetricsUseCase() {
    const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInRepository);

    return getUserMetricsUseCase;
}

export function makeValidateCheckInUseCase() {
    const validateCheckInUseCase = new ValidateCheckInUseCase(checkInRepository);

    return validateCheckInUseCase;
}