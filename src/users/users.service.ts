import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            id: '1',
            name: 'John Doe',
            email: 'XXXXXXXXXXXXXXXXXX',
            age: 30,
            role: 'admin'

        },
        {
            id: '2',
            name: 'Jane Doe',
            email: 'XXXXXXXXXXXXXXXXXX',
            age: 30,
            role: 'user'
        },
        {
            id: '3',
            name: 'Jack Doe',
            email: 'XXXXXXXXXXXXXXXXXX',
            age: 30,
            role: 'guest'
        }
    ]
}
