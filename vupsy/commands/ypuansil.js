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
const üyesadakatdb = require("quick.db");
const üyepuan = new üyesadakatdb.table("sadakatpuanı");
const tepkiler = [
  emojiconfig.onaylaid,
  emojiconfig.reddetid,

];
module.exports = {
  name: "ypuansil",
  guildOnly: true,
  run:  async (message, args,member) =>  {
    
    const sistemkontrol = kayıtsistemdb.get(`kayıtsistem_`);
   
if(!sistemkontrol)
{
  return message.reply(`Herhangi bir kayıt sistemi açık değil, önce sistemi ayarlayınız...`);
}
   
if(sistemkontrol === 'kod')
{
  return message.reply(`Kod Doğrulama sistemi açık, bu komut bu sistemde kullanılamaz.`)
}


    if(sistemkontrol === 'public' || sistemkontrol === 'taglı')
    {
      
        if(!message.member.roles.cache.has(rolconfig.üstyetkiliroller) && (!message.member.hasPermission("ADMINISTRATOR"))) return message.reply(`Bu komutu kullanabilmek için ayarlanan kayıt yetkisine sahip olmalısınız!`);
        let user = message.mentions.members.first();
        if (!user) return message.reply(`Bir üye etiketlemelisin. => \`${prefix}ypuansil @üye 10\``).then(x => x.delete({timeout: 5000}));
        let yetkicheck = rolconfig.registery
        if(!yetkicheck.some(role => user.roles.cache.has(role)) && !user.hasPermission("ADMINISTRATOR")) return message.reply(`Bu üye yetkili değil !`);
        let puan = args.filter(arg => !isNaN(arg))[0] || undefined;
        if(!user || !puan) return message.reply(`Hata: Lütfen tüm argümanları doldurunuz!  => \`${prefix}ypuansil @üye 10\``).then(sil => sil.delete({timeout: 5000}));
        const kayitid = user.id;
        const bilgiembed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("dev by forcen")
        .setTitle("Puan Onayı")
        .setDescription(`${user} isimli yetkiliden **${puan}** sadakat puanı silinecek onaylıyor musun?`)
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
                const puanlog = user.guild.channels.cache.find(channel => channel.id === logconfig.puanlog);

                message.channel.send(bilgiembed.setColor("GREEN").setTitle(`Puan Silindi`).setDescription(`Puan silme işlemi başarılı :white_check_mark:`));
                puanlog.send(`${message.author} tarafından ${user} isimli yetkiliden **${puan}** sadakat puanı silindi.`)
                ydb.add(`yetkili_puan${message.author.id}`,-`${puan}`)
        

            }
            if(tepki.emoji.id == emojiconfig.reddetid) {
                return  message.channel.send(bilgiembed.setColor("RED").setTitle(`İşlem İptal Edildi`).setDescription(`Puan Silme İşlemi İptal Edildi.`));
                
              }


    }

}}