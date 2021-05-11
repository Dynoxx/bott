const Discord = require("discord.js");
const otoisimdb = require("quick.db");
const serverconfig = require("../configs/serverconfig.json");
const logconfig = require("../configs/logconfig.json"); 
const rolconfig = require("../configs/rolconfig.json");
const emojiconfig = require("../configs/emojiconfig.json");
const {prefix} = require("../configs/serverconfig.json");
const kayıtsistemdb = require("quick.db");
const yetkilibilgi = require("quick.db");
const ydb = new yetkilibilgi.table("yetkili");
const üyebilgi =  require("quick.db");
const kdb = new üyebilgi.table("kullanici");
const üyesadakatdb = require("quick.db");
const üyepuan = new üyesadakatdb.table("sadakatpuanı");

module.exports = {
  name: "kayıtsız",
  guildOnly: true,
  run:  async (message, args) =>  {

  
    if(!message.member.roles.cache.has(rolconfig.registery) && (!message.member.hasPermission("ADMINISTRATOR")))
    return message.channel.send(`Yetkili Değilsin !`).then(x => x.delete({timeout: 5000}));
    let member = message.mentions.members.first();
    if (!member) return message.channel.send('Bir üye etiketlemelisin.').then(x => x.delete({timeout: 5000}));
       
    const sistemkontrol = kayıtsistemdb.get(`kayıtsistem_`);
    if(!sistemkontrol)
    {
      return message.reply(`Herhangi bir kayıt sistemi açık değil, önce sistemi ayarlayınız...`);
    }
    if(sistemkontrol === 'kod') {
      const kayitid = member.id;
    const roles = [];
    ydb.add(`yetkili_unregsayisi${message.author.id}_`,1)
    kdb.add(`üye_unregsayisi${kayitid}`,1)
    ydb.push(`yetkili_unregson_${message.author.id}_`,`${member}`)
    üyepuan.add(`üyesp_${kayitid}`,-5)
    const unreglog = message.guild.channels.cache.get(logconfig.unreglog)
    unreglog.send(`${member} üyesi ${message.author} tarafından kayıtsıza atıldı !`);
    if(member.roles.cache.has(rolconfig.boosterrol)) {
      roles[1] = (rolconfig.boosterrol);
      member.roles.set(roles);
      return message.channel.send(`${member} ${message.author} tarafından kayıtsıza atıldı.`)
     
    }
   if(!member.roles.cache.has(rolconfig.boosterrol))
       {
        unreglog.send(`${member} üyesi ${message.author} tarafından kayıtsıza atıldı !`);
      member.roles.set(roles);
      return message.channel.send(`${member} ${message.author} tarafından kayıtsıza atıldı.`)
    }
}

if(sistemkontrol === 'taglı') {
  const kayitid = member.id;
    const roles = [rolconfig.kayıtsız];
    ydb.add(`yetkili_unregsayisi${message.author.id}_`,1)
    kdb.add(`üye_unregsayisi${kayitid}`,1)
    ydb.push(`yetkili_unregson_${message.author.id}_`,`${member}`)
    üyepuan.add(`üyesp_${kayitid}`,-5)
    const unreglog = message.guild.channels.cache.get(logconfig.unreglog)
    unreglog.send(`${member} üyesi ${message.author} tarafından kayıtsıza atıldı !`);
    if(member.roles.cache.has(rolconfig.boosterrol)) {
      roles[1] = (rolconfig.boosterrol);
      member.roles.set(roles);
      return message.channel.send(`${member} ${message.author} tarafından kayıtsıza atıldı.`)
     
    }
   if(!member.roles.cache.has(rolconfig.boosterrol))
       {
        unreglog.send(`${member} üyesi ${message.author} tarafından kayıtsıza atıldı !`);
      member.roles.set(roles);
      return message.channel.send(`${member} ${message.author} tarafından kayıtsıza atıldı.`)
    }
}

if(sistemkontrol === 'public') {
  const kayitid = member.id;
    const roles = [rolconfig.kayıtsız];
    ydb.add(`yetkili_unregsayisi${message.author.id}_`,1)
    kdb.add(`üye_unregsayisi${kayitid}`,1)
    ydb.push(`yetkili_unregson_${message.author.id}_`,`${member}`)
    üyepuan.add(`üyesp_${kayitid}`,-5)
    const unreglog = message.guild.channels.cache.get(logconfig.unreglog)
    unreglog.send(`${member} üyesi ${message.author} tarafından kayıtsıza atıldı !`);
    if(member.roles.cache.has(rolconfig.boosterrol)) {
      
      roles[1] = (rolconfig.boosterrol);
      member.roles.set(roles);
     
    
  
    return  message.channel.send(`${member} ${message.author} tarafından kayıtsıza atıldı.`);
     
      
    }
   if(!member.roles.cache.has(rolconfig.boosterrol))
       {
        unreglog.send(`${member} üyesi ${message.author} tarafından kayıtsıza atıldı !`);
      member.roles.set(roles);
      return message.channel.send(`${member} ${message.author} tarafından kayıtsıza atıldı.`)
    }
}

}}