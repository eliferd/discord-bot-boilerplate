import { Message } from 'discord.js';

export interface ICommand {
    args: string[];
    shouldExecute(): boolean;
    execute(): void;
}

export default abstract class BaseCommand implements ICommand {
    args!: string[];

    constructor(protected readonly message: Message) {}

    abstract execute(): void;

    shouldExecute(): boolean {
        return true;
    }
}
