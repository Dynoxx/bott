const Discord = require("discord.js");
const otoisimdb = require("quick.db");
const otoroldb = require("quick.db");
const serverconfig = require("../configs/serverconfig.json");   
const logconfig = require("../configs/logconfig.json"); 
const rolconfig = require("../configs/rolconfig.json");
const emojiconfig = require("../configs/emojiconfig.json");
const {prefix} = require("../configs/serverconfig.json");


module.exports = {
  name: "otorol",
  cooldown:5,
  guildOnly: true,

  run:  async (message,member) =>  {

    
    
    const bilgiembed = new Discord.MessageEmbed()
 
    .setTitle("Bilgi")
    .setColor("RANDOM")
    .setFooter("dev by forcen")
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
    .setTimestamp()
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    if(![(rolconfig.üstyetkiliroller)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Üst Yetkili Komutudur, Yetkin Yetersiz")

   const otorol = otoroldb.get(`otorol_`)

   if(otorol) {
 bilgiembed.setDescription(`
 Sunucuda Ayarlanmış Oto Rol <@&${otorol}>
   
   `)
   return  message.channel.send(bilgiembed)
}
if(!otorol) {
    bilgiembed.setDescription(`
      Sunucuda Oto Rol Ayarlanmamış
      
      `)
      return  message.channel.send(bilgiembed)
   }

}

}




