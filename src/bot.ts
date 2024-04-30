import { Awaitable, Client, ClientEvents, GatewayIntentBits, Message } from 'discord.js';
import CommandFactory from './commands/command-factory';
import { ICommand } from './commands/base-command';

export default class Bot {

    private client!: Client;

    private readonly events: Partial<Record<keyof ClientEvents, (...args: any[]) => Awaitable<void>>> = {
        ready: this.onReady,
        messageCreate: this.onMessageCreate,
        error: this.onError
    };

    constructor(private readonly token: string) {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMessageTyping,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.MessageContent
            ]
        });

        Object.entries(this.events).forEach(([eventName, handler]) => this.client.on(eventName, handler.bind(this)));

        this.client.login(token);
    }

    private onReady(): void {
        console.log(`Logged in as ${this.client.user?.tag}!`);
    }

    private onMessageCreate(message: Message): void {
        const prefix = process.env.COMMAND_PREFIX;

        if (!prefix || !message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;

        const command: ICommand | null = CommandFactory.getCommand(message);

        if (command && command.shouldExecute()) {
            command.execute();
        }
    }

    private onError(error: Error): void {
        console.error(error);
    }
}
