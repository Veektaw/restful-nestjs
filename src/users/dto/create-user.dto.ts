export class CreateUserDto {
    name: string;
    email: string;
    age: number;
    role: 'admin' | 'user' | 'guest';
}