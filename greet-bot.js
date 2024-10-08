const {Telegraf} = require('telegraf');
const dotenv = require("dotenv");

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.command('help', (ctx) => {
    ctx.reply(`
    The bot can greet in different languages.
    List of supported greetings:
    - privet - Russian
    - hello - English
    - hola - Spanish
    `);
});

bot.hears('privet',  (ctx) => ctx.reply('privet Fam'));
bot.hears('hello', (ctx) => ctx.reply('hello Fam'));
bot.hears('hola', (ctx) => ctx.reply('hola Amigo'));

bot.on('text', (ctx) => ctx.reply(`Greeting "${ctx.update.message.text}" is not supported.`))

bot.launch().then(() => console.log('Started'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));