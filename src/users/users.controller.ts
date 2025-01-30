import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {

    @Get() 
    findAll(@Query('role') role?: | 'admin' | 'user' | 'guest') {
        return {
            name: 'John Doe',
            email: 'XXXXXXXXXXXXXXXXXX',
            age: 30,
            role: role
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return {
           id: id,
        }
    }

    @Post()
    create(@Body() user: {}) {
        return user
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() user: {}) {
        return {
            id: id,
            ...user
        }
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return {
            id: id,
            deleted: true
        }
    }   
}
