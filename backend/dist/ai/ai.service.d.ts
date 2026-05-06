import { DataSource } from 'typeorm';
export declare class AiService {
    private dataSource;
    private ai;
    constructor(dataSource: DataSource);
    generateAndExecuteSql(userInput: string): Promise<any>;
}
