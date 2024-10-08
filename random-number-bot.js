const {Telegraf, Markup} = require('telegraf');
const dotenv = require("dotenv");

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getCoinSide = () => getRandomInt(0, 1) === 0 ? 'Head' : 'Tail';
const coinInlineKeyboard = Markup.inlineKeyboard([
    Markup.button.callback('Flip a coin', 'flip_a_coin'),
]);

bot.hears('Flip a coin', ctx => ctx.reply(getCoinSide(), coinInlineKeyboard));
bot.action('flip_a_coin', async(ctx) => {
    await ctx.editMessageText(`${getCoinSide()}\nEdited: ${new Date().toISOString()}`, coinInlineKeyboard);
});

const getRandomNumber = () => getRandomInt(0, 100);
const numberInlineKeyboard = Markup.inlineKeyboard([
    Markup.button.callback('Generate a new number', 'random_number'),
]);
bot.hears('Generate a new number', ctx => ctx.reply(getRandomNumber().toString(), numberInlineKeyboard));
bot.action('random_number', async(ctx) => {
    await ctx.editMessageText(`${getRandomNumber()}\nEdited: ${new Date().toISOString()}`, numberInlineKeyboard);
});

bot.use(async (ctx) => {
    await ctx.reply('What do you want to do?', Markup
        .keyboard([
            ['Flip a coin', 'Generate a new number'],
        ]).resize()
    )
});

bot.launch().then(() => console.log('Started'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));