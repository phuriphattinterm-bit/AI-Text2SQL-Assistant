import { AiService } from './ai.service';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    askDatabase(prompt: string): Promise<any>;
}
