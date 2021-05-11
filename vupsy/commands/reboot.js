
const Discord = require('discord.js');
const serverconfig = require("../configs/serverconfig.json");   
const logconfig = require("../configs/logconfig.json"); 
const rolconfig = require("../configs/rolconfig.json");
const emojiconfig = require("../configs/emojiconfig.json");
const {prefix} = require("../configs/serverconfig.json");
module.exports = {
    name: "reboot",
    guildOnly: true,
    run:  async (message) =>  {
    
    if(![(rolconfig.üstyetkiliroller)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Üst Yetkili Komutudur, Yetkin Yetersiz")

    
   return message.channel.send(`Yeniden başlatılıyor...`).then(message => {
        console.log(`Konsol: Yeniden başlatılıyor...`);
        process.exit(0);})
           
           
    
    
  
}
          
}