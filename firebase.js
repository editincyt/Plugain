import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { initializeApp, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import serviceAccount from './serviceAccountKey.json' assert { type: "json" };

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Firebase Admin başlat
initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://plugain-1f481-default-rtdb.europe-west1.firebasedatabase.app/"
});

const db = getDatabase();

bot.start(async (ctx) => {
  const userId = ctx.from.id.toString();
  const name = ctx.from.first_name;
  const username = ctx.from.username || "yok";

  const userRef = db.ref("users/" + userId);
  const snapshot = await userRef.get();

  if (!snapshot.exists()) {
    await userRef.set({
      name,
      username,
      points: 0,
      clickCount: 0,
      lastClick: null
    });
  }

  const siteURL = `https://plugain.vercel.app/?uid=${userId}`;
  ctx.reply(`👋 Merhaba ${name}!\nSiteye gitmek için:\n\n🔗 ${siteURL}`);
});

// Kullanıcının mesajlarını dinle
bot.on('text', async (ctx) => {
  const userId = ctx.from.id.toString();
  const mesaj = ctx.message.text;

  const mesajRef = db.ref(`messages/${userId}/${Date.now()}`);
  await mesajRef.set({
    text: mesaj
  });

  ctx.reply("Mesajın kaydedildi ✅");
});

bot.launch();
