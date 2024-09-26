import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CreateGymUseCase } from "../gym/create-gym-usecase";
import { GetGymsUseCase } from "../gym/get-gyms-usecase";
import { GetNearbyGymsUseCase } from "../gym/get-nearby-gyms";

const gymsRepository = new PrismaGymRepository();

export function makeCreateGymUseCase() {
    const createGymUseCase = new CreateGymUseCase(gymsRepository);

    return createGymUseCase;
}

export function makeGetGymsUseCase() {
    const getGymsUseCase = new GetGymsUseCase(gymsRepository);

    return getGymsUseCase;
}

export function makeGetNearbyGymsUseCase() {
    const getNearbyGymsUseCase = new GetNearbyGymsUseCase(gymsRepository);

    return getNearbyGymsUseCase;
}