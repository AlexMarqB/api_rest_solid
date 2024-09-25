import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-checkIns-repository";
import { ValidateCheckInUseCase } from "./validate-check-in-usecase";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { TimeLimitExpired } from "../@errors/max-time-to-validate-error";

let checkInRepository: InMemoryCheckInsRepository;
//System under test
let sut: ValidateCheckInUseCase;

describe("Validate Check-in UseCase", () => {
	//Unit Test

	beforeEach(async () => {
		checkInRepository = new InMemoryCheckInsRepository();
		sut = new ValidateCheckInUseCase(checkInRepository);

		//Gera o mocking
        vi.useFakeTimers()
	});

	afterEach(() => {
		//Reverte o mocking
		vi.useRealTimers()
	});

	it("Should be able to validate a check in", async () => {
		const createdCheckIn = await checkInRepository.create({
			gym_id: "gym-01",
			user_id: "user-id",
		});

		const { checkIn } = await sut.execute({
			checkInId: createdCheckIn.id,
		});

		expect(checkIn.validated_at).toEqual(expect.any(Date));
		expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date));
	});

	it("Should not be able to validate an inexistent check-in", async () => {

		await expect(() =>
			sut.execute({
				checkInId: "unexinstent-check-in-id",
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError)
	});

    it("Should not be able to validate a check-in after 20 minutes of its creation", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        const createdCheckIn = await checkInRepository.create({
			gym_id: "gym-01",
			user_id: "user-id",
            // O created_at executa o new Date logo ele irá seguir o horário do mockado acima
		});

        const twentyOneMinutesMis = 1000 * 60 * 21

        //passo o numero de milisegundos que eu quero avançar
        vi.advanceTimersByTime(twentyOneMinutesMis) 

        // Agora quando o new date for chamado irá utilizar a data 20 min no futuro

        await expect(() => sut.execute({
            checkInId: createdCheckIn.id
        })).rejects.toBeInstanceOf(TimeLimitExpired)
    })
});
