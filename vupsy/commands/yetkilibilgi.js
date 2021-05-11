const Discord = require("discord.js");
const otoisimdb = require("quick.db");
const serverconfig = require("../configs/serverconfig.json");
const logconfig = require("../configs/logconfig.json"); 
const rolconfig = require("../configs/rolconfig.json");
const emojiconfig = require("../configs/emojiconfig.json");
const {prefix} = require("../configs/serverconfig.json");
const kayıtsistemdb = require("quick.db");
const moment = require("moment");
const tepkiler = [
  emojiconfig.sayi1id,
  emojiconfig.sayi2id,
  emojiconfig.sayi3id,
  emojiconfig.sayi4id,
];
const üyebilgi =  require("quick.db");
const kdb = new üyebilgi.table("kullanici");
const yetkilibilgi = require("quick.db");
const ydb = new yetkilibilgi.table("yetkili");
module.exports = {
  name: "yetkilibilgi",
  guildOnly: true,
  run:  async (message, args) =>  {
    const sorusoran = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter("dev by forcen")
    .setTitle("Bilgi Tablosu")
    .setDescription(`${emojiconfig.sayi1} **Toplamlar Menüsü**\n
    ${emojiconfig.sayi2} **Sadakat Menüsünü Açar**\n
    ${emojiconfig.sayi3} **Son Kayıtlarını Açar**\n
    ${emojiconfig.sayi4} **Son Unreg'lerini Açar**\n  `)

    const sistemkontrol = kayıtsistemdb.get(`kayıtsistem_`);
       
    if(sistemkontrol === 'public' || sistemkontrol === 'taglı')
    {
    if(!message.member.roles.cache.has(rolconfig.registery) && !message.member.hasPermission("ADMINISTRATOR")) { return message.reply(`Bu komutu kullanabilmek için ayarlanan kayıt yetkisine sahip olmalısınız!`);}
    let user = message.mentions.members.first();
    if(!user) return message.reply(`Bir üye etiketlemelisin.`);
     let yetkicheck = rolconfig.registery
    if(!yetkicheck.some(role => user.roles.cache.has(role)) && !user.hasPermission("ADMINISTRATOR")) return message.reply(`Bu üye yetkili değil !`);
  
    
    const kayitid = user.id
    
   var bilgiyok = `Bilgi Bulunamadı`
   var yetkilitoplamerkek = ydb.get(`yetkili_kayiterkek_${kayitid}_`)
   if(!yetkilitoplamerkek) { yetkilitoplamerkek = bilgiyok}
   var yetkilitoplamkiz = ydb.get(`yetkili_kayitkiz_${kayitid}_`)
   if(!yetkilitoplamkiz) {yetkilitoplamkiz = bilgiyok}
  var sonunregler = ydb.fetch(`yetkili_unregson_${kayitid}_`)
  if(!sonunregler) { sonunreglerson = bilgiyok, sonunreg = bilgiyok}
  var sayii =0;
  if(sonunregler) {
   sonunregler.map(x => sayii++);
 
       var sonunreglerson = sonunregler.slice(0,9).join("\n");   
       var sonunreg = sonunregler.slice(sayii-1,sayii).join(",");
      
}
  var sonkayıtlar = ydb.fetch(`yetkili_kayıtları_${kayitid}_`)
  if(!sonkayıtlar) { sonkayıtlarson = bilgiyok, sonkayitt = bilgiyok}
  var sayi =0;
  if(sonkayıtlar) {
   sonkayıtlar.map(x => sayi++);
 
       var sonkayıtlarson = sonkayıtlar.slice(0,9).join("\n");   
       var sonkayitt = sonkayıtlar.slice(sayi-1,sayi).join(",");
      
}

  
   var yetkilibaşla = ydb.get(`yetkili_başlangıç${kayitid}`)
   if(!yetkilibaşla) {yetkilibaşla = bilgiyok}
    var yetkilitoplamkayit = ydb.get(`yetkili_id${kayitid}`)
    if(!yetkilitoplamkayit) {yetkilitoplamkayit = bilgiyok}
   
    var yetkilitoplampuan = ydb.get(`yetkili_puan${kayitid}`)
    if(yetkilitoplampuan === null) {yetkilitoplampuan = `0`; var rozet = `**Yeni Yetkili**`;}
    var yetkilitoplamunreg = ydb.get(`yetkili_unregsayisi${kayitid}_`)
    if(!yetkilitoplamunreg) {yetkilitoplamunreg = bilgiyok}
   let tepkibekle = await message.channel.send(sorusoran).then(async m => {
    await   m.react(emojiconfig.sayi1)
    await m.react(emojiconfig.sayi2)
    await   m.react(emojiconfig.sayi3)
    await  m.react(emojiconfig.sayi4)
      return m;
    }).catch(err => undefined)
   
    let tepki = await tepkibekle.awaitReactions((reaction, user) => user.id == message.author.id && tepkiler.some(emoji => emoji == reaction.emoji.id),{ errors: ["time"], max: 1, time: 10000 })
     .then(coll => coll.first())
     .catch(err => { message.channel.send(sorusoran.setDescription(`${message.author} 10 saniye boyunca cevap vermediği için kayıt işlemi iptal edildi.`))
    .then(sil => sil.delete({timeout: 7500})); tepkibekle.delete().catch(); return; });
    if(!tepki) return;
    tepkibekle.delete()

    if (tepki.emoji.id == emojiconfig.sayi1id) {
        return message.channel.send(sorusoran
            .setTitle(`**➥Toplamlar Menüsü**`)
            .setColor("RANDOM")
            .setFooter("dev by forcen")
            .setAuthor(user.user.tag)
            .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Toplam Kayıt **${yetkilitoplamkayit}**\n
            Toplam Erkek Kayıt: **${yetkilitoplamerkek}**\n
            Toplam Kız Kayıt: **${yetkilitoplamkiz}**\n
            Toplam Puan **${yetkilitoplampuan}**\n
            Toplam Unreg Atma **${yetkilitoplamunreg}**\n
            Yetkili Başlama Tarih **${yetkilibaşla}**\n
            `));
    }
    if (tepki.emoji.id == emojiconfig.sayi2id) {
        if(yetkilitoplampuan >= 500) { yetkilitoplampuan = `500`; var rozet = `**Mükemmel Skor**`}
        if(yetkilitoplampuan >=400 && yetkilitoplampuan <=499) { var rozet = `**Başarılı Skor**`}
        if(yetkilitoplampuan >=300 && yetkilitoplampuan <=399) { var rozet = `**Ortalama Skor**`}
         if(yetkilitoplampuan >=200 && yetkilitoplampuan <=299) { var rozet = `**Riskli Skor**`}
         if(yetkilitoplampuan >=100 &&  yetkilitoplampuan <=199) { var rozet = `**Güvensiz Yetkili**`}
       if(yetkilitoplampuan <=99&& yetkilitoplampuan >0) {  var rozet = `**Yeni Yetkili**`}
         if(yetkilitoplampuan<0) {yetkilitoplampuan= `0`; var rozet = `**Yeni Yetkili**`}
       
       return message.channel.send(sorusoran
       .setTitle(`**➥Yetkili Sadakat Puanı Menüsü**`)
       .setColor("RANDOM")
       .setFooter("dev by forcen")
       .setAuthor(user.user.tag)
       .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
       .setDescription(`➥Yetkili Sadakat Puanın **${yetkilitoplampuan}**\n
       ➥${rozet}\n
       **500** Puan = Mükemmel Skor\n
       **400-499** Puan = Başarılı Skor\n
       **300-399** Puan = Ortalama Skor\n
       **200-299** Puan = Riskli Skor\n
       **100-199** Puan = Güvensiz Yetkili\n
       **0-99** Puan = Yeni Yetkili\n`));
    }

    if (tepki.emoji.id == emojiconfig.sayi3id) {
        return message.channel.send(sorusoran
          .setTitle(`**➥Son Kayıtlar Menüsü**`)
          .setColor("RANDOM")
          .setFooter("dev by forcen")
          .setAuthor(user.user.tag)
          .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
          .setDescription(`➥Son 10 Kaydı \n\n**${sonkayıtlarson}**\n\n➥Toplam Kayıt Sayısı: **${sayi}**\n\n➥Son Kayıt: **${sonkayitt}**`));

      }
      if (tepki.emoji.id == emojiconfig.sayi4id) {
        return message.channel.send(sorusoran
          .setTitle(`**➥Son Unreg'ler Menüsü**`)
          .setColor("RANDOM")
          .setFooter("dev by forcen")
          .setAuthor(user.user.tag)
          .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
          .setDescription(`➥Son 10 Unreg'i \n\n**${sonunreglerson}**\n\n➥Toplam Unreg Sayısı: **${sayii}**\n\n➥Son Unreg: **${sonunreg}**`));
             
        
      
      }





}
//burası public bitişi

if(!sistemkontrol)
    {
      return message.reply(`Herhangi bir kayıt sistemi açık değil, önce sistemi ayarlayınız...`);
    }
       
    if(sistemkontrol === 'kod')
    {
      return message.reply(`Kod Doğrulama sistemi açık, bu komut bu sistemde kullanılamaz.`)
    }






  }}
