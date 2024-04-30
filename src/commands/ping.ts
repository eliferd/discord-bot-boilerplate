import BaseCommand from './base-command';
import { Message } from 'discord.js';

export default class Ping extends BaseCommand {
    constructor(protected readonly message: Message) {
        super(message);
    }

    execute(): void {
        const latency = Date.now() - this.message.createdTimestamp;

        if (this.args?.[0]?.toLowerCase() === 'api') {
            this.message.channel.send('[api] Pong ! **' + Math.round(this.message.client.ws.ping) + 'ms**');
        } else if (this.args?.[0]?.toLowerCase() === 'client') {
            this.message.channel.send('[client] Pong ! **' + latency + 'ms**');
        } else {
            this.message.channel.send('Pong ! **' + latency + 'ms** | API Latency : **' + Math.round(this.message.client.ws.ping) + 'ms**');
        }
    }
}
