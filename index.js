import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { db } from './firebase.js';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
  const userId = ctx.from.id.toString();
  const firstName = ctx.from.first_name || "";
  const lastName = ctx.from.last_name || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const username = ctx.from.username || null;

  const userRef = db.ref('users/' + userId);

  const snapshot = await userRef.get();

  if (!snapshot.exists()) {
    await userRef.set({
      name: fullName,
      username: username,
      points: 0,
      clickCount: 0,
      lastClick: null
    });
  } else {
    // Kullanıcı varsa da username güncel olsun
    await userRef.update({ name: fullName, username });
  }

  // Web App URL'si
  const siteURL = `https://plugain.vercel.app/u/${userId}`;

  // Telegram inline butonu ile Web App'i başlatma
  ctx.reply(`Merhaba ${fullName || "kullanıcı"}! 👋\nReklam izlemek ve puan kazanmak için aşağıdaki butona tıklayın:`, {
    reply_markup: {
      inline_keyboard: [
        [{
          text: "Reklam İzlemeye Başla",
          web_app: { url: siteURL } // Burada Web App URL'si veriliyor
        }]
      ]
    }
  });
});

bot.launch();
