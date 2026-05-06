import { Injectable, InternalServerErrorException, BadRequestException, NotFoundException } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { DataSource } from 'typeorm';

@Injectable()
export class AiService {
    private ai: GoogleGenAI;

    constructor(private dataSource: DataSource) {
        this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }

    async generateAndExecuteSql(userInput: string): Promise<any> {
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

            if(!response.text) {
                throw new NotFoundException('Invalid Input')
            }

            let rawQuery = response.text.trim();

            rawQuery = rawQuery.replace(/```sql/gi, '').replace(/```/gi, '').trim();

            if (!rawQuery.toUpperCase().startsWith('SELECT')) {
                throw new BadRequestException('For safety, only SELECT queries are allowed.');
            }

            console.log('Executing AI Query:', rawQuery);

            const queryResults = await this.dataSource.query(rawQuery);

            return { 
                queryGenerated: rawQuery, 
                data: queryResults 
            };

        } catch (error) {
            console.error('AI Execution Error:', error);
            throw new InternalServerErrorException(error.message || 'Failed to process AI query');
        }
    }
}