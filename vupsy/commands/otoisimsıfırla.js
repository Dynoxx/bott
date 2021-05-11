const Discord = require("discord.js");
const otoisimdb = require("quick.db");
const serverconfig = require("../configs/serverconfig.json");   
const logconfig = require("../configs/logconfig.json"); 
const rolconfig = require("../configs/rolconfig.json");
const emojiconfig = require("../configs/emojiconfig.json");
const {prefix} = require("../configs/serverconfig.json");
module.exports = {
    name: "otoisimsıfırla",
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


   const otoisim = otoisimdb.get(`otoisim_`)

   if(otoisim) {
       otoisimdb.delete(`otoisim_`)
       const otoisimlog = message.guild.channels.cache.get(logconfig.otoisimlog)
       const otoisimlogg = new Discord.MessageEmbed()
       .setTitle("Bilgi")
       .setColor("RANDOM")
       .setFooter("dev by forcen")
       .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
       .setTimestamp()
       .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
       .setDescription(`Sunucuda oto isim sıfırlandı \n Sıfırlayan:  ${message.author}`)
       otoisimlog.send(otoisimlogg)
      return message.channel.send(`Oto isim **${message.author}** tarafından sıfırlandı.`)

  

}
if(!otoisim) {
    bilgiembed.setDescription(`
      Sunucuda ayarlanmış oto isim bulunmamakta.
      
      `)
      return  message.channel.send(bilgiembed)
   }

}







}