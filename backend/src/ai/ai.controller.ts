import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
    constructor(private readonly aiService: AiService) {}

    @Post('ask')
    async askDatabase(@Body('prompt') prompt: string) {
        
        const result = await this.aiService.generateAndExecuteSql(prompt);
        
        return result; 
    }
}