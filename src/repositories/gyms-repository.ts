import { Gym, Prisma } from "@prisma/client";

export interface FindManyNearbyParams {
    latitude: number
    longitude: number
}

export interface GymsRepository {
    create(data: Prisma.GymCreateInput): Promise<Gym>
    findyById(id: string): Promise<Gym | null>;
    searchMany(query: string, page: number): Promise<Gym[]>;
    findManyNearby({latitude, longitude}: FindManyNearbyParams): Promise<Gym[]>;
}