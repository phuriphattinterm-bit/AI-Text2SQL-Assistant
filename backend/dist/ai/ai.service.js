"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const genai_1 = require("@google/genai");
const typeorm_1 = require("typeorm");
let AiService = class AiService {
    dataSource;
    ai;
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.ai = new genai_1.GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    async generateAndExecuteSql(userInput) {
        const systemPrompt = `
You are an expert SQL generator. Your only task is to translate natural language questions into perfectly formatted, executable MySQL queries.

CRITICAL RULES:
1. Respond ONLY with the raw SQL query. Do not include markdown formatting (like \`\`\`sql), greetings, or explanations.
2. Prioritize SELECT statements for safety.
3. If prompt is in Thai, convert it to English.

DATABASE SCHEMA:
Table: product
Columns: 
- id (INT, Primary Key)
- name (VARCHAR)
- category (VARCHAR), Category includes Electronics, Furniture, Accesories
- price (DECIMAL)
- stock_quantity (INT)

User Request: "${userInput}"
        `;
        try {
            const response = await this.ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: systemPrompt
            });
            if (!response.text) {
                throw new common_1.NotFoundException('Invalid Input');
            }
            let rawQuery = response.text.trim();
            rawQuery = rawQuery.replace(/```sql/gi, '').replace(/```/gi, '').trim();
            if (!rawQuery.toUpperCase().startsWith('SELECT')) {
                throw new common_1.BadRequestException('For safety, only SELECT queries are allowed.');
            }
            console.log('Executing AI Query:', rawQuery);
            const queryResults = await this.dataSource.query(rawQuery);
            return {
                queryGenerated: rawQuery,
                data: queryResults
            };
        }
        catch (error) {
            console.error('AI Execution Error:', error);
            throw new common_1.InternalServerErrorException(error.message || 'Failed to process AI query');
        }
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], AiService);
//# sourceMappingURL=ai.service.js.map