import { ICommand } from './base-command';
import Ping from './ping';
import { Message } from 'discord.js';

export default class CommandFactory {
    static getCommand(message: Message): ICommand | null {
        const prefix = process.env.COMMAND_PREFIX;
        const [commandName, ...args] = message.content.split(' ');

        let command: ICommand | null = null;

        switch (commandName.toLowerCase().split(prefix!).pop()) {
            case 'ping':
                command = new Ping(message);
                command.args = args;
                break;
            default:
                message.channel.send(`${process.env.MSG_CMD_NOT_FOUND}`);
                break;
        }

        return command;
    }
}
