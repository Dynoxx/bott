const Discord = require("discord.js");
const otoisimdb = require("quick.db");
const serverconfig = require("../configs/serverconfig.json");   
const logconfig = require("../configs/logconfig.json"); 
const rolconfig = require("../configs/rolconfig.json");
const emojiconfig = require("../configs/emojiconfig.json");
const {prefix} = require("../configs/serverconfig.json");
const kayıtsistemdb = require("quick.db");

module.exports = {
  name: "kayıtsistem",
  cooldown:5,
  guildOnly: true,

  run:  async (message,args,client) =>  {

const bilgiembed = new Discord.MessageEmbed()
 
    .setTitle("Bilgi")
    .setColor("RANDOM")
    .setFooter("dev by forcen")
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
    .setTimestamp()
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    if(![(rolconfig.üstyetkiliroller)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Üst Yetkili Komutudur, Yetkin Yetersiz")
    let kontrol = args.join(' ');
    if(!kontrol){
      bilgiembed.setDescription(`Argümanları girmelisin => \`${prefix}kayıtsistem kod/public/taglı\``)
    return  message.channel.send(bilgiembed)
    }
    if(kontrol === 'kod'){
      otoisimdb.delete(`otoisim_`)
      kayıtsistemdb.set(`kayıtsistem_`, `kod`)
      return message.channel.send("**Kod Doğrulama Sistemine Geçildi** !\nOto İsim Sistemi Deaktif Hale Getirildi !\nKayıt Komutları Deaktif Hale Getirildi !")

    }
    if(kontrol === 'taglı'){
      kayıtsistemdb.set(`kayıtsistem_`, `taglı`)
      return message.channel.send("Taglı Alıma Geçildi !")
    }
    if(kontrol === 'public'){
      kayıtsistemdb.set(`kayıtsistem_`, `public`)
      return message.channel.send("Public Kayıt Sistemine Geçildi !")
    }


  }}