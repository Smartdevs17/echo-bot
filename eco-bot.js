const {Telegraf} = require('telegraf');
const dotenv = require("dotenv");

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.use(async (ctx) => {
    await ctx.reply(JSON.stringify(ctx.update, null, 2));
});

bot.launch().then(() => console.log('Started'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));