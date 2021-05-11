const Discord = require("discord.js");
const otoisimdb = require("quick.db");
const otoroldb = require("quick.db");
const serverconfig = require("../configs/serverconfig.json");   
const logconfig = require("../configs/logconfig.json"); 
const rolconfig = require("../configs/rolconfig.json");
const emojiconfig = require("../configs/emojiconfig.json");
const {prefix} = require("../configs/serverconfig.json");
const moment = require("moment");


module.exports = {
    name: "otorolayar",
    guildOnly: true,
    run:  async (message,args,client) =>  {
  
    const bilgiembed = new Discord.MessageEmbed()
    .setTitle("Bilgi")
    .setColor("RANDOM")
    .setFooter("dev by forcen")
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
    .setTimestamp()
    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
    if(![(rolconfig.üstyetkiliroller)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Üst Yetkili Komutudur, Yetkin Yetersiz")
 let belirlenenrol = message.mentions.roles.first();
if(!belirlenenrol){
    bilgiembed.setDescription(`Kullanıcılara verilecek rolü yazmalısın`)
  return  message.channel.send(bilgiembed)
}
if(belirlenenrol) {

otoroldb.set(`otorol_`, `${belirlenenrol.id}`)
 message.channel.send(`Oto rol ${belirlenenrol} olarak ayarlandı.`)
  const otorollog = message.guild.channels.cache.get(logconfig.otorollog)
 const otorollogg = new Discord.MessageEmbed()
 .setTitle("Bilgi")
 .setColor("RANDOM")
 .setFooter("dev by forcen")
 .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
 .setTimestamp()
 .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
 .setDescription(`Sunucuda oto rol ayarlandı \n Ayarlanan Oto Rol: ${belirlenenrol} \n Ayarlayan:  ${message.author}`)
  otorollog.send(otorollogg)
}


}
}