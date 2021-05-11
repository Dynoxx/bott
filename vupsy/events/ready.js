const Discord = require("discord.js");
const serverconfig = require("../configs/serverconfig.json")   
const logconfig = require("../configs/logconfig.json") 
const rolconfig = require("../configs/rolconfig.json")

module.exports = async client => {
  client.user.setPresence({ activity: { name: `dev by ❤️ forcen` , type: "PLAYING"}, status: 'idle' })
  let botyaziyorkanalii = client.channels.cache.get(serverconfig.botyaziyorkanali)
  if(botyaziyorkanalii) botyaziyorkanalii.startTyping().then(console.log("Bot yazıyor işlemi başarılı!"))
  .catch(err => console.error("Bot yazıyor işlemi başarısız!"));
  let botVoiceChannel = client.channels.cache.get(serverconfig.botseskanali);
  if (botVoiceChannel) botVoiceChannel.join()
  .then(console.log("Bot başarıyla ses kanalına bağlandı"))
  .catch(err => console.error("Bot ses kanalına bağlanırken bir hata oluştu!"));
  
};

// Type kısımları:
// WATCHING - İZLİYOR
// PLAYING - OYNUYOR
// LISTENING - DİNLİYOR

// Status kısımları:
// online - çevrim içi
// idle - boşta
// dnd - rahatsız etmeyin

// name kısmına oynuyorunuzu yazabilirsiniz.
