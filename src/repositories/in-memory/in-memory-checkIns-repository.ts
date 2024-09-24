import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements CheckInsRepository {
    public items: CheckIn[] = []

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            created_at: new Date(),
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
        }

        this.items.push(checkIn)

        return checkIn;
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        // TDD: Implementamos de forma simples para o teste passar
        // const checkOnSameDate = this.items.find(checkIn => checkIn.user_id === userId)

        // TDD: Refactor
        const startOfTheDay = dayjs(date).startOf('date') // date === dia; day === dia da semana
        // Data de hoje: 2023-02-28T15:30 => ele retorna 2023-02-28T00:00
        const endOfTheDay = dayjs(date).endOf('date') // date === dia; day === dia da semana
        // Data de hoje: 2023-02-28T15:30 => ele retorna 2023-02-28T23:59

        const checkInOnSameDate = this.items.find(checkIn => {
            const checkInDate = dayjs(checkIn.created_at)
            const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

            return checkIn.user_id === userId && isOnSameDate;
        })

        if(!checkInOnSameDate) {
            return null
        }

        return checkInOnSameDate
    }

    async findyManyByUserId(userId: string, page: number) {
        return this.items
        .filter(checkIn => checkIn.user_id === userId)
        .slice((page - 1) * 20, page * 20) // pega do indice x até o indice y
    }
}