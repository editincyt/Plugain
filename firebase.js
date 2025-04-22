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
      lastClick: ""
    });
  }

  const siteURL = `https://plugain.vercel.app/?uid=${userId}`;
  ctx.reply(`Merhaba ${name}!\nReklam izlemek ve puan kazanmak için siteye git:\n\n🔗 ${siteURL}`);
});
