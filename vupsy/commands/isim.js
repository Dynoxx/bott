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
const tüyebilgi = require("quick.db");
const tkdb = new tüyebilgi.table("tkullanici");
const tyetkilibilgi = require("quick.db");
const tydb = new tyetkilibilgi.table("tyetkili");
const tepkiler = [
  emojiconfig.onaylaid,
  emojiconfig.reddetid,

];
module.exports = {
  name: "isim",
  guildOnly: true,
  run:  async (message, args,member) =>  {

  
      if(!message.member.roles.cache.has(rolconfig.registery) && (!message.member.hasPermission("ADMINISTRATOR"))) return message.reply(`Bu komutu kullanabilmek için ayarlanan kayıt yetkisine sahip olmalısınız!`);
      let user = message.mentions.members.first();
      if (!user) return message.reply(`Bir üye etiketlemelisin. => \`${prefix}isim @üye isim\``).then(x => x.delete({timeout: 5000}));
      args = args.filter(a => a !== "" && a !== " ").splice(1);
      let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");    
      if(!isim) return message.reply(`Bir isim girmelisin. => \`${prefix}isim @üye isim\``);
     
      const bilgiembed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter("dev by forcen")
      .setTitle("İşlem Onayı")
      .setDescription(`${message.author} ${user} üyesinin ismi **${isim}** olarak değiştirilecek onaylıyor musun?` )
      let tepkibekle = await message.channel.send(bilgiembed).then(async m => {
        await   m.react(emojiconfig.onayla)
        await m.react(emojiconfig.reddet)
          return m;
        }).catch(err => undefined)
      let tepki = await tepkibekle.awaitReactions((reaction, user) => user.id == message.author.id && tepkiler.some(emoji => emoji == reaction.emoji.id),{ errors: ["time"], max: 1, time: 10000 })
      .then(coll => coll.first())
      .catch(err => { message.channel.send(bilgiembed.setDescription(`${message.author} 10 saniye boyunca cevap vermediği için kayıt işlemi iptal edildi.`))
     .then(sil => sil.delete({timeout: 7500})); tepkibekle.delete().catch(); return; });
     if(!tepki) return;
     tepkibekle.delete()
   
         if(tepki.emoji.id == emojiconfig.onaylaid) {
            const isimlog = user.guild.channels.cache.find(channel => channel.id === logconfig.isimlog);
         
          isimlog.send(`${user} kullanıcısının ismi ${message.author} tarafından **${isim}** olarak değiştirildi.`)    
          user.setNickname(`${isim}`);
         
         message.channel.send(bilgiembed.setColor("GREEN").setTitle(`İşlem Başarılı`).setDescription(`Kullanıcının ismi değiştirildi :white_check_mark:`));   
         
                    }  
     
 




  }}