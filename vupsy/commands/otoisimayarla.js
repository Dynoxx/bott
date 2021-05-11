const Discord = require("discord.js");
const otoisimdb = require("quick.db");
const serverconfig = require("../configs/serverconfig.json");   
const logconfig = require("../configs/logconfig.json"); 
const rolconfig = require("../configs/rolconfig.json");
const emojiconfig = require("../configs/emojiconfig.json");
const {prefix} = require("../configs/serverconfig.json");


module.exports = {
    name: "otoisimayar",
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
 let belirlenenisim = args.join(' ');
if(!belirlenenisim){
    bilgiembed.setDescription(`Kullanıcılara verilecek ismi yazmalısın`)
  return  message.channel.send(bilgiembed)
}
if(belirlenenisim) {

otoisimdb.set(`otoisim_`, `${belirlenenisim}`)
 message.channel.send(`Oto isim **${belirlenenisim}** olarak ayarlandı.`)
  const otoisimlog = message.guild.channels.cache.get(logconfig.otoisimlog)
 const otoisimlogg = new Discord.MessageEmbed()
 .setTitle("Bilgi")
 .setColor("RANDOM")
 .setFooter("dev by forcen")
 .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
 .setTimestamp()
 .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
 .setDescription(`Sunucuda oto isim ayarlandı \n Ayarlanan Oto İsim : **${belirlenenisim}** \n Ayarlayan:  ${message.author}`)
  otoisimlog.send(otoisimlogg)
}


}
}