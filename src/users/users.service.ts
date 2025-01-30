import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: 'John Doe',
            email: 'XXXXXXXXXXXXXXXXXX',
            age: 30,
            role: 'admin'

        },
        {
            id: 2,
            name: 'Jane Doe',
            email: 'XXXXXXXXXXXXXXXXXX',
            age: 30,
            role: 'user'
        },
        {
            id: 3,
            name: 'Jack Doe',
            email: 'XXXXXXXXXXXXXXXXXX',
            age: 30,
            role: 'guest'
        }
    ]

    findAll(role?: 'admin' | 'user' | 'guest') {
        if (role) {
            return this.users.filter(user => user.role === role)
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        return user
    }

    create(user: { name: string; email: string; age: number; role: 'admin' | 'user' | 'guest' }) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const highestId = usersByHighestId.length > 0 ? usersByHighestId[0].id : 0;

        const newUser = {
            id: highestId + 1,
            ...user
        };

        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updatedUser: {name?: string, email?: string, age?: number, role?: 'admin' | 'user' | 'guest'}) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return {...user, ...updatedUser}
            }
            return user
        })
        return this.findOne(id)
    }


    delete(id: number) {
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return removedUser
    }
}
