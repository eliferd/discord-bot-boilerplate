import 'dotenv/config.js'
import Bot from './bot';

new Bot(`${process.env.SECRET}`);
