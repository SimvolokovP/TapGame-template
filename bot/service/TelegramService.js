const TelegramBot = require("node-telegram-bot-api");
const {
  token,
  webAppUrl,
  channelUsername,
} = require("../config/telegramConfig");
const ReferralService = require("./ReferralService");

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start(.*)/, async (msg, match) => {
  const referralId = msg.chat.id;
  const referrerId = match[1].trim();

  const welcomeMessage = `Добро пожаловать в TapMan! ${channelUsername}`;
  await bot.sendMessage(referralId, welcomeMessage);
  await bot.sendMessage(referralId, "Нажмите кнопку ниже, чтобы начать:", {
    reply_markup: {
      inline_keyboard: [[{ text: "Start", web_app: { url: webAppUrl } }]],
    },
  });

  if (referrerId) {
    await ReferralService.processReferral(referralId, referrerId);
  }
});

module.exports = bot;
