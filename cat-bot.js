const {Telegraf} = require('telegraf');
const dotenv = require("dotenv");

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

const chatId = 123;
const intervalMs = 5000;
const getCatUrl = () => `https://cataas.com/cat?t=${new Date().getTime()}`;

const sendCat = async () => {
    bot.telegram.sendPhoto(chatId, getCatUrl()).then(() => setTimeout(sendCat, intervalMs));
}

sendCat();

bot.launch().then(() => console.log('Started'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));