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
    // Kullanıcı varsa da username güncel olsun (Telegram'da sonradan ekleyebilir)
    await userRef.update({ name: fullName, username });
  }

  // Telegram için daha stabil çalışan yol formatı: /u/:uid
  const siteURL = `https://plugain.vercel.app/u/${userId}`;
  ctx.reply(`Merhaba ${fullName || "kullanıcı"}! 👋\nReklam izlemek ve puan kazanmak için aşağıdaki bağlantıya tıkla:\n\n🔗 ${siteURL}`);
});
