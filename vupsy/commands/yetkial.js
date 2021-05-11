const Discord = require("discord.js");
const otoisimdb = require("quick.db");
const serverconfig = require("../configs/serverconfig.json");
const logconfig = require("../configs/logconfig.json"); 
const rolconfig = require("../configs/rolconfig.json");
const emojiconfig = require("../configs/emojiconfig.json");
const {prefix} = require("../configs/serverconfig.json");
const kayıtsistemdb = require("quick.db");
const moment = require("moment");
const üyebilgi =  require("quick.db");
const kdb = new üyebilgi.table("kullanici");
const yetkilibilgi = require("quick.db");
const ydb = new yetkilibilgi.table("yetkili");
module.exports = {
  name: "yetkial",
  guildOnly: true,
  run:  async (message, member, args) =>  {
    const sistemkontrol = kayıtsistemdb.get(`kayıtsistem_`);
   
if(!sistemkontrol)
{
  return message.reply(`Herhangi bir kayıt sistemi açık değil, önce sistemi ayarlayınız...`);
}
   
if(sistemkontrol === 'kod')
{
  return message.reply(`Kod Doğrulama sistemi açık, bu komut bu sistemde kullanılamaz.`)
}

if(sistemkontrol === 'taglı')
{
  return message.reply(`Taglı Alım sistemi açık, bu komut bu sistemde kullanılamaz.`)
}
    if(sistemkontrol === 'public'){
    const yetkilog = message.guild.channels.cache.get(logconfig.yetkililog)
    signature = rolconfig.üstyetkiliroller
    if(![(signature)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bunun için ayarlanmış yetkiye sahip değilsin!`);
    let user = message.mentions.members.first() 
    if (!user) return  message.reply(`Birini etiketlemelisin => \`${prefix}yetkial @üye\``).catch(console.error);
    
  
  user.roles.remove(rolconfig.yetkiverkomutrolleri);
  const embed = new Discord.MessageEmbed()
          .setDescription(`${user} kullanıcısı yetkileri alındı!`)
          .setFooter('dev by forcen')
          .setColor("RANDOM")
          .setTimestamp()
      message.channel.send(embed)
      yetkilog.send(embed)
  }
}
}
