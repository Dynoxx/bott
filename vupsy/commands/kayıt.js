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
const tepkiler = [
  emojiconfig.onaylaid,
  emojiconfig.reddetid,

];
module.exports = {
  name: "kayıt",
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

if(sistemkontrol === 'taglı')
{
  return message.reply(`Taglı Alım sistemi açık, bu komut bu sistemde kullanılamaz.`)
}
    if(sistemkontrol === 'public')
    {
    if(!message.member.roles.cache.has(rolconfig.registery) && (!message.member.hasPermission("ADMINISTRATOR"))) return message.reply(`Bu komutu kullanabilmek için ayarlanan kayıt yetkisine sahip olmalısınız!`);
    let user = message.mentions.members.first();
    if (!user) return message.reply(`Bir üye etiketlemelisin. => \`${prefix}kayıt @üye isim\``).then(x => x.delete({timeout: 5000}));
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");    
    if(!isim) return message.reply(`Bir isim girmelisin. => \`${prefix}kayıt @üye isim\``);
    const sorusoran = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter("dev by forcen")
    .setTitle("Kayıt Onayı")
    .setDescription(`${user} isimli kullanıcı **${isim}** ismiyle kaydedilecek\n
    Kullanıcıya <@&${(rolconfig.publicüyerol)}> rolü verilecek ve <@&${(rolconfig.kayıtsız)}> rolü silinecek\n
    Onaylıyor Musun? **${message.author}**`)
    let tepkibekle = await message.channel.send(sorusoran).then(async m => {
      await   m.react(emojiconfig.onayla)
      await m.react(emojiconfig.reddet)
        return m;
      }).catch(err => undefined)
      let tepki = await tepkibekle.awaitReactions((reaction, user) => user.id == message.author.id && tepkiler.some(emoji => emoji == reaction.emoji.id),{ errors: ["time"], max: 1, time: 10000 })
   .then(coll => coll.first())
   .catch(err => { message.channel.send(sorusoran.setDescription(`${message.author} 10 saniye boyunca cevap vermediği için kayıt işlemi iptal edildi.`))
  .then(sil => sil.delete({timeout: 7500})); tepkibekle.delete().catch(); return; });
  if(!tepki) return;
  tepkibekle.delete()

      if(tepki.emoji.id == emojiconfig.onaylaid) {
      user.setNickname(`${isim}`);
      user.roles.add(rolconfig.publicüyerol)
      if(user.roles.cache.has(rolconfig.kayıtsız)) {
        user.roles.remove(rolconfig.kayıtsız);
      }
    const ilkkayitay = moment(message.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık").toString();
    const ilkkayityil = moment(message.createdAt).format("YYYY");
    const ilkkayitgün = moment(message.createdAt).format("DD");
    const kayitid = user.id;
    ydb.add(`yetkili_id${message.author.id}`,1) 
    ydb.add(`yetkili_puan${message.author.id}`,5)
    ydb.push(`yetkili_kayıtları_${message.author.id}_`,`${user}`)
    kdb.add(`üye_id${kayitid}_`,1)
    kdb.push(`üyeeskisimler_${kayitid}_`,`${isim}`)
  var kayittarih = moment(message.createdAt).format("DD MM YYYY");
   kdb.push(`üyeyetkilileri_${kayitid}_`,`${message.author}`)
   kdb.push(`üye_kayittarih${kayitid}`,`${kayittarih}`)
  const ilkkayitaycheck = kdb.get(`üye_ilkay${kayitid}_`)
  const ilkkayityilcheck = kdb.get(`üye_ilkyil${kayitid}_`)
  const ilkkayitgüncheck = kdb.get(`üye_ilkgün${kayitid}_`)
  const kayityetkilicheck = kdb.get(`üye_yetkilisi_${kayitid}_`)
    if(!kayityetkilicheck)
    {
      kdb.push(`üye_yetkilisi_${kayitid}_`,`${message.author}`)
    }
    if(!ilkkayitaycheck){
      kdb.push(`üye_ilkay${kayitid}_`,`${ilkkayitay}`)
    }
    if(!ilkkayityilcheck){
      kdb.push(`üye_ilkyil${kayitid}_`,`${ilkkayityil}`)
    }
    if(!ilkkayitgüncheck){
      kdb.push(`üye_ilkgün${kayitid}_`,`${ilkkayitgün}`)
    }
    const genelchat = user.guild.channels.cache.find(channel => channel.id === logconfig.genelchatkanal);

    message.channel.send(sorusoran.setColor("GREEN").setTitle(`Kayıt Yapıldı`).setDescription(`Kayıt Başarılı :white_check_mark:`));
    genelchat.send(`Yeni birisi katıldı. Hadi ona merhaba diyelim :) ${user}`)
    
  }
   
  
  if(tepki.emoji.id == emojiconfig.reddetid) {
    return  message.channel.send(sorusoran.setColor("RED").setTitle(`Kayıt İptal Edildi`).setDescription(`İşlem İptal Edildi. Üye Kayıt Edilmedi...`));
    
  }
    



}











}}