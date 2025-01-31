import { Injectable, ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
    async logToFile(entry) {
        const formattedEntry = `${new Intl.DateTimeFormat('en-US', {
            dateStyle: 'short',
            timeStyle: 'medium',
            timeZone: 'Africa/Lagos',
        }).format(new Date())}\t${entry}\n`;

        try {
            if(!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
                await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'));
            }
            await fsPromises.appendFile(path.join(__dirname, '..', '..', 'logs', 'myLogFile.log'), formattedEntry);
        } catch (error) {
            console.error('Error writing to log file:', error);
        }
    }

    log(message: any, context?: string) {
        const entry = `${context}\t${message}`;
        this.logToFile(entry);
        super.log(context, message);
    }
    
    error(message: any, stackOrContext?: string) {
        const entry = `${stackOrContext}\t${message}`;
        this.logToFile(entry);
        super.error(message, stackOrContext);
    }
}
