const Discord = require("discord.js");
const otoisimdb = require("quick.db");
const otoroldb = require("quick.db");
const serverconfig = require("../configs/serverconfig.json");   
const logconfig = require("../configs/logconfig.json"); 
const rolconfig = require("../configs/rolconfig.json");
const emojiconfig = require("../configs/emojiconfig.json");
const {prefix} = require("../configs/serverconfig.json");
module.exports = {
    name: "otorolsıfırla",
    guildOnly: true,
    run:  async (message,member) =>  {
     
    const bilgiembed = new Discord.MessageEmbed()
    .setTitle("Bilgi")
    .setColor("RANDOM")
    .setFooter("dev by forcen")
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
    .setTimestamp()
    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
    if(![(rolconfig.üstyetkiliroller)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Üst Yetkili Komutudur, Yetkin Yetersiz")


   const otorol = otoroldb.get(`otorol_`)

   if(otorol) {
       otoisimdb.delete(`otorol_`)
       const otorollog = message.guild.channels.cache.get(logconfig.otorollog)
       const otorollogg = new Discord.MessageEmbed()
       .setTitle("Bilgi")
       .setColor("RANDOM")
       .setFooter("dev by forcen")
       .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
       .setTimestamp()
       .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
       .setDescription(`Sunucuda oto rol sıfırlandı \n Sıfırlayan:  ${message.author}`)
       otorollog.send(otorollogg)
      return message.channel.send(`Oto rol **${message.author}** tarafından sıfırlandı.`)

  

}
if(!otorol) {
    bilgiembed.setDescription(`
      Sunucuda ayarlanmış oto rol bulunmamakta.
      
      `)
      return  message.channel.send(bilgiembed)
   }

}







}