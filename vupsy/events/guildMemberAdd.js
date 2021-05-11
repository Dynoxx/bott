const Discord = require("discord.js");
const moment = require("moment");
const serverconfig = require("../configs/serverconfig.json")   
const logconfig = require("../configs/logconfig.json") 
const rolconfig = require("../configs/rolconfig.json")
const otoisimdb = require("quick.db");
const otoroldb = require("quick.db");
const kayıtsistemdb = require("quick.db");
const kayıtsistemi = require("../commands/kayıtsistemi");
const üyesadakatdb = require("quick.db");
const üyepuan = new üyesadakatdb.table("sadakatpuanı");
var iltifatSayi = 0; 
module.exports = async client => {
client.on("guildMemberAdd", async (member,message) => {

  var puancheck = üyepuan.get(`üyesp_${member.id}`)
  if(!puancheck){ üyepuan.add(`üyesp_${member.id}`,100) }
  
 
  const sistemkontrol = kayıtsistemdb.get(`kayıtsistem_`);
  if(sistemkontrol === 'kod') {
 
    const iltifatlar = [
      '153123',
      '164677',
      '935923',
      '473254',
      '586544',
      '865235',
      '224355',
      '654745',
      "756341",
      "856234",
      "765813",
      "547542",
      "475474",
      "654754"
    ];
    const tag = serverconfig.tag;
   
    iltifatSayi++
    if(iltifatSayi >= 1) { 
      iltifatSayi = 0;
      const random = Math.floor(Math.random() * ((iltifatlar).length - 1) + 1);
        const etiketat = member.guild.channels.cache.get(logconfig.hgmesajkanali);
        etiketat.send(`${member}`); 
      const kanal = member.guild.channels.cache.get(logconfig.hgmesajkanali);
      let user = client.users.cache.get(member.id);
      kanal.send(new Discord.MessageEmbed()
      .setColor("GOLD")
            .setTitle("Pirates'a Hoşgeldin !")
            .setFooter("dev by forcen")
            .setTimestamp()
            .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
            .setDescription(`
   
               Doğrulama Kodun => **${(iltifatlar)[random]}**
               Bu kanala doğrulama kodunu yazarak kayıt olabilirsin.
   
            `)
            .setImage(logconfig.hgresimlink)  
            )
      let beklenen = `${(iltifatlar)[random]}`
      var denemehakki = 0;
   client.on('message', async message=> {
   if(message.author.bot) return;
   if(message.content.toLocaleLowerCase() !== beklenen && message.channel.id === logconfig.hgmesajkanali && message.author.id === member.id ) 
   {
    await denemehakki++
    return  message.reply(`Yanlış kod, kalan deneme hakkın => ${3-denemehakki}. Sesli odalara girip bilgi alabilirsin.`)}
     if(denemehakki === 3) member.kick();
   
   if(message.content === beklenen && message.channel.id === logconfig.hgmesajkanali && message.author.id === member.id ) 
   {
     member.roles.add(rolconfig.kodsistemüyerol)
     member.setNickname(`${tag} ${member.user.username}`)
     const genelchat = member.guild.channels.cache.find(channel => channel.id === logconfig.genelchatkanal);
     genelchat.send(`Yeni birisi katıldı. Hadi ona merhaba diyelim :) ${member}`)
   } 
   })
   }}
  
   if(sistemkontrol === 'public') {
 
  

  let guvenilirlik = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
  let memberGün = moment(member.user.createdAt).format("DD");
  let memberTarih = moment(member.user.createdAt).format("YYYY HH:mm");
  let memberAylar = moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık");
 
  let toplamüye = member.guild.members.cache.size.toString().replace(/ /g, "    ")
    const otoisim = otoisimdb.get(`otoisim_`)
    const otorol = otoroldb.get(`otorol_`)
    if(otoisim){
      member.setNickname(otoisim);
    }
    if(otorol) {
      member.roles.add(otorol)
    }
    const etiketkanal = member.guild.channels.cache.get(logconfig.hgmesajkanali)
    const hgmesajkanali =  client.channels.cache.get(logconfig.hgmesajkanali)
    const register = rolconfig.registery
    const hgresim = logconfig.hgresimlink
    const kuranlar = client.channels.cache.get(logconfig.kurallarkanal)
    const hgmesaji = new Discord.MessageEmbed() 
    .setTitle("Aramıza Hoşgeldin")
    .setColor("RANDOM")
    .setFooter("dev by forcen")
    .setTimestamp()
    .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
    .setImage(hgresim)
    .setDescription(`Yeni katılan kişi ${member} \n
    Toplam kişi sayısı **${toplamüye}** \n
    Kayıt olmak için ${hgmesajkanali} odasına göz gezdirebilirsin. \n
    Bu arada ${kuranlar} kanalını okumayı unutma :) \n
    Hesap kuruluş: **${memberGün} ${memberAylar} ${memberTarih}** \n
    
    
    
    
    `)
  etiketkanal.send(`<@&${register}> || ${member}`); 
 hgmesajkanali.send(hgmesaji)
}

  if(sistemkontrol === 'taglı') {
    const otorol = otoroldb.get(`otorol_`)
    const tag = serverconfig.tag
   if(otorol) {
     member.roles.add(otorol)
   }


    const otoisim = otoisimdb.get(`otoisim_`)
    if(otoisim){
      member.setNickname(`${tag} ${otoisim}`);
    }
    if(!otoisim){
      member.setNickname(`${tag} İsim || Yaş`);
    }
    let toplamüye = member.guild.members.cache.size.toString().replace(/ /g, "    ")
    const register = rolconfig.registery

    let guvenilirlik = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
    let memberGün = moment(member.user.createdAt).format("DD");
    let memberTarih = moment(member.user.createdAt).format("YYYY HH:mm");
    let memberAylar = moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık");
kayitkanal = member.guild.channels.cache.get(logconfig.hgmesajkanali)

kayitkanal.send(`\n
Sunucu'ya Hoşgeldin ${member} || <@&${register}> \n
Hesabını açılış süresi  ${memberGün} ${memberAylar} ${memberTarih} ${guvenilirlik  ?  "**=> Şüpheli!**" : "**=> Güvenli!**" }\n     
Seninle beraber **${toplamüye}** kişi olduk! Sol tarafta bulunan sesli odalardan birine girerek kayıt işlemini gerçekleştirebilirsin.\n
`)

}




})

client.on("guildMemberRemove", async (member,message) => {
  üyepuan.add(`üyesp_${member.id}`,-15)

})

}