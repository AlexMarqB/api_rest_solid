import { Prisma, User } from "@prisma/client";

export class InMemoryUsersRepository {
    public users: User[] = []

    async create(data: Prisma.UserCreateInput) {
		this.users.push(data as User)

        return data as User;
	}

    async findByEmail(email: string) {
        const user = this.users.find(user => user.email === email)
        
        return user;
    }
}