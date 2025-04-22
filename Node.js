import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { initializeApp } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Firebase başlat
initializeApp({
  credential: applicationDefault(),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = getDatabase();

bot.start(async (ctx) => {
  const userId = ctx.from.id.toString();
  const name = ctx.from.first_name;

  const userRef = db.ref('users/' + userId);

  const snapshot = await userRef.get();

  if (!snapshot.exists()) {
    await userRef.set({
      name,
      points: 0,
      clickCount: 0,
      lastClick: null
    });
  }

  const siteURL = `https://plugain.vercel.app/?uid=${userId}`;
  ctx.reply(`Merhaba ${name}! 👋\nReklam izlemek ve puan kazanmak için siteye git:\n\n🔗 ${siteURL}`);
});

bot.launch();
