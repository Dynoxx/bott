const Discord = require("discord.js");
const otoisimdb = require("quick.db");
const serverconfig = require("../configs/serverconfig.json");
const logconfig = require("../configs/logconfig.json"); 
const rolconfig = require("../configs/rolconfig.json");
const emojiconfig = require("../configs/emojiconfig.json");
const {prefix} = require("../configs/serverconfig.json");
const kayıtsistemdb = require("quick.db");
const moment = require("moment");
const üyesadakatdb = require("quick.db");
const üyepuan = new üyesadakatdb.table("sadakatpuanı");
const tüyebilgi = require("quick.db");
const tkdb = new tüyebilgi.table("tkullanici");
const tyetkilibilgi = require("quick.db");
const tydb = new tyetkilibilgi.table("tyetkili");
const tepkiler = [
  emojiconfig.sayi1id,
  emojiconfig.sayi2id,
  emojiconfig.sayi3id,
  emojiconfig.sayi4id,
  emojiconfig.sayi5id,
];
const üyebilgi =  require("quick.db");
const kdb = new üyebilgi.table("kullanici");
const yetkilibilgi = require("quick.db");
const ydb = new yetkilibilgi.table("yetkili");
module.exports = {
  name: "üyebilgi",
  guildOnly: true,
  run:  async (message, args) =>  {
    const sorusoran = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter("dev by forcen")
    .setTitle("Üye Bilgi Menüsü")
    .setDescription(`${emojiconfig.sayi1} **İsimler Menüsünü Açar**\n
    ${emojiconfig.sayi2} **Kayıt Bilgilerini Açar**\n
    ${emojiconfig.sayi3} **Kayıt Tarihlerini Açar**\n
    ${emojiconfig.sayi4} **Kaydeden Bilgilerini Açar**\n
    ${emojiconfig.sayi5} **Sadakat Puanı Menüsünü Açar**  `)

    const sistemkontrol = kayıtsistemdb.get(`kayıtsistem_`);
       
    if(sistemkontrol === 'public')
    {
    if(!message.member.roles.cache.has(rolconfig.registery) && (!message.member.hasPermission("ADMINISTRATOR"))){ return message.reply(`Bu komutu kullanabilmek için ayarlanan kayıt yetkisine sahip olmalısınız!`);}
    let user = message.mentions.members.first();
    if(!user) return message.reply(`Bir üye etiketlemelisin.`);
    const kayitid = user.id
    
   var bilgiyok = `Bilgi Bulunamadı`
  var üyesadakatpuanı = üyepuan.get(`üyesp_${kayitid}`)
   if(üyesadakatpuanı===null) {üyesadakatpuanıtop = `0`;var rozet = `**Güvensiz Üye**`;}
   
   if(üyesadakatpuanı){
     var üyesadakatpuanıtop = üyesadakatpuanı;
   }
   var kayityetkilileri = kdb.fetch(`üyeyetkilileri_${kayitid}_`)
   var sayi3 = 0;
   if(kayityetkilileri){
    kayityetkilileri.map(x => sayi3++);
    var kayityetkililerison = kayityetkilileri.slice(0,9).join("\n");   
    var sonkaydeden = kayityetkilileri.slice(sayi3-1,sayi2).join(",");
   }
   if(kayityetkilileri === null) {kayityetkililerison = bilgiyok  , sonkaydeden = bilgiyok}
   var kayittarih = kdb.fetch(`üye_kayittarih${kayitid}`)
   var sayi2 = 0;
   if(kayittarih){
    kayittarih.map(x => sayi2++);
    var kayittarihson = kayittarih.slice(0,9).join("\n");   
    var sonkayit = kayittarih.slice(sayi2-1,sayi2).join(",");
   }
   if(kayittarih === null) {kayittarihson = bilgiyok , sonkayit = bilgiyok}
    var eskisiimler =  kdb.fetch(`üyeeskisimler_${kayitid}_`)
    if(!eskisiimler) {eskiisimlerson = bilgiyok , sonisim = bilgiyok}
  
    var sayi=0;
   if(eskisiimler) {
     eskisiimler.map(x => sayi++);
  
        var eskiisimlerson = eskisiimler.slice(0,9).join("\n");   
        var sonisim = eskisiimler.slice(sayi-1,sayi).join(",");
       
}

    var kaçkayıt = kdb.fetch(`üye_id${kayitid}_`)

    if(!kaçkayıt) {kaçkayıt = bilgiyok}
    var kaçkezunreg = kdb.get(`üye_unregsayisi${kayitid}`)
    if(!kaçkezunreg) {kaçkezunreg = bilgiyok}
  
    var üyeilkay = kdb.get(`üye_ilkay${kayitid}_`)
    if(!üyeilkay) {üyeilkay = `Bilgi`}
    var üyeilkyil = kdb.get(`üye_ilkyil${kayitid}_`)
    if(!üyeilkyil) {üyeilkyil = `Bulunamadı`}
    var üyeilkgün = kdb.get(`üye_ilkgün${kayitid}_`)
    if(!üyeilkgün) {üyeilkgün = `Bu`}
    var kayityetkilicheck = kdb.fetch(`üye_yetkilisi_${kayitid}_`)
    var ilkkayittarih = (`${üyeilkgün}  ${üyeilkay}  ${üyeilkyil}`)
   
    if(!kayityetkilicheck){kayityetkilicheck = bilgiyok}
   
  let tepkibekle = await message.channel.send(sorusoran).then(async m => {
  await   m.react(emojiconfig.sayi1)
  await m.react(emojiconfig.sayi2)
  await   m.react(emojiconfig.sayi3)
  await  m.react(emojiconfig.sayi4)
  await m.react(emojiconfig.sayi5)
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
      .setTitle(`**➥İsimler Menüsü**`)
      .setColor("RANDOM")
      .setFooter("dev by forcen")
      .setAuthor(user.user.tag)
      .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
      .setDescription(`➥İlk 10 İsmi \n\n**${eskiisimlerson}**\n\n➥Toplam İsim Sayısı: **${sayi}**\n\n➥Son İsmi: **${sonisim}**`));
         
    
  
  }
  if (tepki.emoji.id == emojiconfig.sayi2id) {
    
    return message.channel.send(sorusoran
      .setTitle(`**➥Kayıt Detay Menüsü**`)
      .setColor("RANDOM")
      .setFooter("dev by forcen")
      .setAuthor(user.user.tag)
      .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
      .setDescription(`Kaç kez kayıt olmuş: **${kaçkayıt}**\n
        İlk kayıt tarihi: **${ilkkayittarih}**\n
        İlk kaydeden yetkili: **${kayityetkilicheck}**\n
        Kaç kez unreg atıldı: **${kaçkezunreg}**`))
   
     
     }
     if (tepki.emoji.id == emojiconfig.sayi3id) {
    return message.channel.send(sorusoran
    .setTitle(`**➥Kayıt Tarihleri Menüsü**`)
    .setColor("RANDOM")
    .setFooter("dev by forcen")
    .setAuthor(user.user.tag)
    .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
    .setDescription(`➥İlk 10 Kayıt Tarihi \n\n**${kayittarihson}**\n\n➥Toplam Kaydolma Sayısı: **${sayi2}**\n\n➥Son Kayıt Tarihi: **${sonkayit}**`));
     }
     if (tepki.emoji.id == emojiconfig.sayi4id) {
      return message.channel.send(sorusoran
      .setTitle(`**➥Kimler Kaydetti Menüsü**`)
      .setColor("RANDOM")
      .setFooter("dev by forcen")
      .setAuthor(user.user.tag)
      .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
      .setDescription(`➥İlk 10 Kaydedeni \n\n**${kayityetkililerison}**\n\n➥Toplam Kaydeden Sayısı: **${sayi3}**\n\n➥Son Kayıt Yapan: **${sonkaydeden}**`));
       }
       if (tepki.emoji.id == emojiconfig.sayi5id) {
        let yetkicheck = rolconfig.registery
        if(yetkicheck.some(role => user.roles.cache.has(role)) || user.hasPermission("ADMINISTRATOR")) { return message.channel.send(sorusoran
          .setTitle(`**➥Sadakat Puanı Menüsü**`)
          .setColor("RANDOM")
          .setFooter("dev by forcen")
          .setAuthor(user.user.tag)
          .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
          .setDescription(`**➥Kişi Yetkili Olduğu İçin Sadakat Puanı Yok**\n
          **➥Yetkili Bilgi Komutu İle Yetkili Sadakat Puanına Bakabilirsiniz.**`)) }
         if(üyesadakatpuanıtop >= 100) { üyesadakatpuanıtop = `100`; var rozet = `**Mükemmel Skor**`}
         else if(üyesadakatpuanıtop >=70 && üyesadakatpuanıtop <=99) { var rozet = `**Başarılı Skor**`}
         else if(üyesadakatpuanıtop >=50 && üyesadakatpuanıtop <=69) { var rozet = `**Ortalama Skor**`}
         else if(üyesadakatpuanıtop >=35 && üyesadakatpuanıtop <=49) { var rozet = `**Riskli Skor**`}
         else if(üyesadakatpuanıtop <=34) { üyesadakatpuanıtop = üyesadakatpuanıtop <0 ? 0: üyesadakatpuanıtop; var rozet = `**Güvensiz Üye**`}
      

        return message.channel.send(sorusoran
        .setTitle(`**➥Sadakat Puanı Menüsü**`)
        .setColor("RANDOM")
        .setFooter("dev by forcen")
        .setAuthor(user.user.tag)
        .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
        .setDescription(`➥Sadakat Puanın **${üyesadakatpuanıtop}**\n
        ➥${rozet}\n
        **100** Puan = Mükemmel Skor\n
        **70-85** Puan = Başarılı Skor\n
        **50-69** Puan = Ortalama Skor\n
        **35-49** Puan = Riskli Skor\n
        **0-34** Puan = Güvensiz Üye`));
         }
  



}
//burası public bitişi//


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
      if(!message.member.roles.cache.has(rolconfig.registery) && (!message.member.hasPermission("ADMINISTRATOR"))){ return message.reply(`Bu komutu kullanabilmek için ayarlanan kayıt yetkisine sahip olmalısınız!`);}
      let user = message.mentions.members.first();
      if(!user) return message.reply(`Bir üye etiketlemelisin.`);
      const kayitid = user.id
    
   var bilgiyok = `Bilgi Bulunamadı`
   var üyesadakatpuanı = üyepuan.get(`üyesp_${kayitid}`)
   if(üyesadakatpuanı===null) {üyesadakatpuanıtop = `0`;var rozet = `**Güvensiz Üye**`;}
   
   if(üyesadakatpuanı){
     var üyesadakatpuanıtop = üyesadakatpuanı;
   }
      var tkaçkayıt = tkdb.get(`tüye_id${kayitid}_`)
      if(!tkaçkayıt) {tkaçkayıt = bilgiyok}
      var tkaçkezunreg = kdb.get(`üye_unregsayisi${kayitid}`)
      if(!tkaçkezunreg) {tkaçkezunreg = bilgiyok}
      var üyeilkay = tkdb.get(`tüye_ilkay${kayitid}_`)
    if(!üyeilkay) {üyeilkay = `Bilgi`}
    var üyeilkyil = tkdb.get(`tüye_ilkyil${kayitid}_`)
    if(!üyeilkyil) {üyeilkyil = `Bulunamadı`}
    var üyeilkgün = tkdb.get(`tüye_ilkgün${kayitid}_`)
    if(!üyeilkgün) {üyeilkgün = `Bu`}
    var tilkkayittarih = (`${üyeilkgün}  ${üyeilkay}  ${üyeilkyil}`)
      var tüyeyetkilisi = tkdb.fetch(`tüye_yetkilisi_${kayitid}_`)
      if(!tüyeyetkilisi) {tüyeyetkilisi = bilgiyok;}
      var tcinsiyet = tkdb.get(`tüye_ilkcinsiyet_${kayitid}_`)
      if(!tcinsiyet) { tcinsiyet = bilgiyok;}
   
      
     
      var tüyeyetkilileri = tkdb.get(`tüyeyetkilileri_${kayitid}_`)
      if(!tüyeyetkilileri) {tüyeyetkililerison = bilgiyok, tsonyetkilisi=bilgiyok}
      var tsayiii = 0;
      if(tüyeyetkilileri){
        tüyeyetkilileri.map(x => tsayiii++);
        tüyeyetkililerison = tüyeyetkilileri.slice(0,9).join("\n");
        tsonyetkilisi = tüyeyetkilileri.slice(tsayiii-1,tsayiii).join(",");
      }
      var tüyekayıttarih =  tkdb.fetch(`tüye_kayittarih${kayitid}`)
      if(!tüyekayıttarih) {tüyekayıttarihson = bilgiyok, tsonkaydeden = bilgiyok}
      var tsayii=0;
      if(tüyekayıttarih){
        tüyekayıttarih.map(x => tsayii++);
        var tüyekayıttarihson = tüyekayıttarih.slice(0,9).join("\n");
        var tsonkaydeden = tüyekayıttarih.slice(tsayii-1,tsayii).join(",");
      }
      
    

      var teskiisimler =  tkdb.fetch(`tüyeeskisimler_${kayitid}_`)
      if(!teskiisimler) {teskiisimlerson = bilgiyok , tsonisim = bilgiyok}
      var tsayi=0;
     if(teskiisimler) {
       teskiisimler.map(x => tsayi++);
    
          var teskiisimlerson = teskiisimler.slice(0,9).join("\n");   
          var tsonisim = teskiisimler.slice(tsayi-1,tsayi).join(",");
         
  }
  
 



      let tepkibekle = await message.channel.send(sorusoran).then(async m => {
        await   m.react(emojiconfig.sayi1)
        await m.react(emojiconfig.sayi2)
        await   m.react(emojiconfig.sayi3)
        await  m.react(emojiconfig.sayi4)
        await m.react(emojiconfig.sayi5)
          return m;
        }).catch(err => undefined)
       
        let tepki = await tepkibekle.awaitReactions((reaction, user) => user.id == message.author.id && tepkiler.some(emoji => emoji == reaction.emoji.id),{ errors: ["time"], max: 1, time: 100000 })
         .then(coll => coll.first())
         .catch(err => { message.channel.send(sorusoran.setDescription(`${message.author} 10 saniye boyunca cevap vermediği için kayıt işlemi iptal edildi.`))
        .then(sil => sil.delete({timeout: 7500})); tepkibekle.delete().catch(); return; });
        if(!tepki) return;
        tepkibekle.delete()
    
        if (tepki.emoji.id == emojiconfig.sayi1id) {
          return message.channel.send(sorusoran
            .setTitle(`**➥İsimler Menüsü**`)
            .setColor("RANDOM")
            .setFooter("dev by forcen")
            .setAuthor(user.user.tag)
            .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
            .setDescription(`➥İlk 10 İsmi \n\n**${teskiisimlerson}**\n\n➥Toplam İsim Sayısı: **${tsayi}**\n\n➥Son İsmi: **${tsonisim}**`));                     
        }
    
        if (tepki.emoji.id == emojiconfig.sayi2id) {
    
          return message.channel.send(sorusoran
            .setTitle(`**➥Kayıt Detay Menüsü**`)
            .setColor("RANDOM")
            .setFooter("dev by forcen")
            .setAuthor(user.user.tag)
            .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Kaç kez kayıt olmuş: **${tkaçkayıt}**\n
              İlk kayıt tarihi: **${tilkkayittarih}**\n
              İlk kaydeden yetkili: **${tüyeyetkilisi}**\n
              İlk kayıttaki cinsiyeti: **${tcinsiyet}**\n
              Kaç kez unreg atıldı: **${tkaçkezunreg}**`))
         
           
           }
           if (tepki.emoji.id == emojiconfig.sayi3id) {
            return message.channel.send(sorusoran
            .setTitle(`**➥Kayıt Tarihleri Menüsü**`)
            .setColor("RANDOM")
            .setFooter("dev by forcen")
            .setAuthor(user.user.tag)
            .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
            .setDescription(`➥İlk 10 Kayıt Tarihi \n\n**${tüyekayıttarihson}**\n\n➥Toplam Kaydolma Sayısı: **${tsayii}**\n\n➥Son Kayıt Tarihi: **${tsonkaydeden}**`));
             }
    
            
            if (tepki.emoji.id == emojiconfig.sayi4id) {
             return message.channel.send(sorusoran
             .setTitle(`**➥Kimler Kaydetti Menüsü**`)
             .setColor("RANDOM")
             .setFooter("dev by forcen")
             .setAuthor(user.user.tag)
             .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
             .setDescription(`➥İlk 10 Kaydedeni \n\n**${tüyeyetkililerison}**\n\n➥Toplam Kaydeden Sayısı: **${tsayiii}**\n\n➥Son Kayıt Yapan: **${tsonyetkilisi}**`));
              }

              if (tepki.emoji.id == emojiconfig.sayi5id) {
                let yetkicheck = rolconfig.registery
                if(yetkicheck.some(role => user.roles.cache.has(role)) || user.hasPermission("ADMINISTRATOR")) { return message.channel.send(sorusoran
                  .setTitle(`**➥Sadakat Puanı Menüsü**`)
                  .setColor("RANDOM")
                  .setFooter("dev by forcen")
                  .setAuthor(user.user.tag)
                  .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
                  .setDescription(`**➥Kişi Yetkili Olduğu İçin Sadakat Puanı Yok**\n
                  **➥Yetkili Bilgi Komutu İle Yetkili Sadakat Puanına Bakabilirsiniz.**`)) }
                 if(üyesadakatpuanıtop >= 100) { üyesadakatpuanıtop = `100`; var rozet = `**Mükemmel Skor**`}
                 else if(üyesadakatpuanıtop >=70 && üyesadakatpuanıtop <=99) { var rozet = `**Başarılı Skor**`}
                 else if(üyesadakatpuanıtop >=50 && üyesadakatpuanıtop <=69) { var rozet = `**Ortalama Skor**`}
                 else if(üyesadakatpuanıtop >=35 && üyesadakatpuanıtop <=49) { var rozet = `**Riskli Skor**`}
                 else if(üyesadakatpuanıtop <=34) { üyesadakatpuanıtop = üyesadakatpuanıtop <0 ? 0: üyesadakatpuanıtop; var rozet = `**Güvensiz Üye**`}
              
        
                return message.channel.send(sorusoran
                .setTitle(`**➥Sadakat Puanı Menüsü**`)
                .setColor("RANDOM")
                .setFooter("dev by forcen")
                .setAuthor(user.user.tag)
                .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
                .setDescription(`➥Sadakat Puanın **${üyesadakatpuanıtop}**\n
                ➥${rozet}\n
                **100** Puan = Mükemmel Skor\n
                **70-85** Puan = Başarılı Skor\n
                **50-69** Puan = Ortalama Skor\n
                **35-49** Puan = Riskli Skor\n
                **0-34** Puan = Güvensiz Üye`));
                 }
    
      }
//burası taglı bitişi






}}