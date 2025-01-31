import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe, Ip } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { MyLoggerService } from 'src/my-logger/my-logger.service';


@SkipThrottle() // This will skip the throttle for all the routes in this controller
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}
    private readonly logger = new MyLoggerService(UsersController.name);

    @SkipThrottle({default: false }) // This will enable the throttle for this route
    @Get() 
    findAll(@Ip() ip: string, @Query('role') role?: | 'admin' | 'user' | 'guest') {
        this.logger.log(`Request from IP: ${ip}`); // This will log the IP of the request
        return this.usersService.findAll(role)
    }

    @Throttle({short: {limit: 3, ttl: 60000}}) // This will override the throttle for this route
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id)
    }

    @Post()
    create(@Body(ValidationPipe) user: CreateUserDto) {
        return this.usersService.create(user)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body(ValidationPipe) user: UpdateUserDto) {
        return this.usersService.update(id, user)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.usersService.delete(id)
    }
}
