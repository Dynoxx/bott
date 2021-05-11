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
  name: "kız",
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

if(sistemkontrol === 'public')
{
  return message.reply(`Public Alım sistemi açık, bu komut bu sistemde kullanılamaz.`)
}
    if(sistemkontrol === 'taglı')
    {
      const bilgiembed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter("dev by forcen")
      .setTitle("Kayıt Onayı")
        if(!message.member.roles.cache.has(rolconfig.registery) && (!message.member.hasPermission("ADMINISTRATOR"))) return message.reply(`Bu komutu kullanabilmek için ayarlanan kayıt yetkisine sahip olmalısınız!`);
        let user = message.mentions.members.first();
        if (!user) return message.reply(`Bir üye etiketlemelisin. => \`${prefix}kız @üye isim yaş\``).then(x => x.delete({timeout: 5000}));
        args = args.filter(a => a !== "" && a !== " ").splice(1);
        let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");    
        if(!isim) return message.reply(`Bir isim girmelisin. => \`${prefix}kız @üye isim\``);
        let BelirlenenIsim;
        let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
        if(!isim || !yaş) return message.reply(`Hata: Lütfen tüm argümanları doldurunuz!  => \`${prefix}kız @üye isim yaş\``).then(sil => sil.delete({timeout: 5000}));
        const kayitid = user.id;
        BelirlenenIsim = `${user.user.username.includes(serverconfig.tag) ? serverconfig.tag : (serverconfig.boştag ? serverconfig.boştag : (serverconfig.tag || ""))} ${isim} || ${yaş}`;
        user.setNickname(`${BelirlenenIsim}`).catch(); 
       await user.roles.set(rolconfig.ekipkizrolleri);
        if(user.user.username.includes(serverconfig.tag)) {  user.roles.add(rolconfig.ekiprol);   }
         

         const ilkkayitay = moment(message.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık").toString();
         const ilkkayityil = moment(message.createdAt).format("YYYY");
         const ilkkayitgün = moment(message.createdAt).format("DD");
         ydb.add(`yetkili_id${message.author.id}`,1) 
         ydb.add(`yetkili_puan${message.author.id}`,5)
         ydb.push(`yetkili_kayıtları_${message.author.id}_`,`${user}`)
         ydb.add(`yetkili_kayitkiz_${message.author.id}_`,1)
         tkdb.add(`tüye_id${kayitid}_`,1)
         tkdb.push(`tüyeeskisimler_${kayitid}_`,`${isim}`)   
         tkdb.push(`tüyeyetkilileri_${kayitid}_`,`${message.author}`)
        var kayittarih = moment(message.createdAt).format("DD MM YYYY");
        tkdb.push(`tüye_kayittarih${kayitid}`,`${kayittarih}`)
        const ilkkayitaycheck = tkdb.get(`tüye_ilkay${kayitid}_`)
        const ilkkayityilcheck = tkdb.get(`tüye_ilkyil${kayitid}_`)
        const ilkkayitgüncheck = tkdb.get(`tüye_ilkgün${kayitid}_`)
        const kayityetkilicheck = tkdb.get(`tüye_yetkilisi_${kayitid}_`)
        const ilkcinsiyetcheck = tkdb.get(`tüye_ilkcinsiyet_${kayitid}_`)
    
 
        
         if(!ilkcinsiyetcheck)
          {
            tkdb.push(`tüye_ilkcinsiyet_${kayitid}_`,`Kız`)
          }
        if(!kayityetkilicheck)
          {
            tkdb.push(`tüye_yetkilisi_${kayitid}_`,`${message.author}`)
          }
          if(!ilkkayitaycheck){
            tkdb.push(`tüye_ilkay${kayitid}_`,`${ilkkayitay}`)
          }
          if(!ilkkayityilcheck){
            tkdb.push(`tüye_ilkyil${kayitid}_`,`${ilkkayityil}`)
          }
          if(!ilkkayitgüncheck){
            tkdb.push(`tüye_ilkgün${kayitid}_`,`${ilkkayitgün}`)
          }
          const kayitlog = user.guild.channels.cache.find(channel => channel.id === logconfig.kayitlogkanal);
          kayitlog.send(`${user} ${message.author} tarafından  <@&${rolconfig.ekipkızrol1}> Olarak Başarıyla Kaydedildi.`)
          const genelchat = user.guild.channels.cache.find(channel => channel.id === logconfig.genelchatkanal);
          message.channel.send(bilgiembed.setColor("GREEN").setTitle(`Kayıt Yapıldı`).setDescription(`Kayıt Başarılı :white_check_mark:`));
          genelchat.send(`Yeni birisi katıldı. Hadi ona merhaba diyelim :) ${user}`)
    
          
    
      }
//burası taglı bitiş




}}