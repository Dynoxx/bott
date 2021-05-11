const Discord = require("discord.js");
const otoisimdb = require("quick.db");
const serverconfig = require("../configs/serverconfig.json");   
const logconfig = require("../configs/logconfig.json"); 
const rolconfig = require("../configs/rolconfig.json");
const emojiconfig = require("../configs/emojiconfig.json");
const {prefix} = require("../configs/serverconfig.json");
module.exports = {
  name: "herkeserolver",
  guildOnly: true,
  run:  async (message) =>  {
    if(![(rolconfig.üstyetkiliroller)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Üst Yetkili Komutudur, Yetkin Yetersiz")
    var rol = message.mentions.roles.first()
    if(!rol) return message.channel.send(`\`Lütfen bir rol belirtin. => ${prefix}herkeserolver @rol\``);
    var sayaç = 0;
    const bilgi = new Discord.MessageEmbed()
        .setTitle("Bilgi")
        .setColor("RANDOM")
        .setFooter("dev by forcen")
        .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
        .setTimestamp()
        .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
    message.guild.members.cache.forEach(async function(kekw2){
        kekw2.roles.add(rol.id);
       
      sayaç = (sayaç+1);
     
        
    bilgi.setDescription(`${sayaç} Kişiye <@&${rol.id}> Rolü verilecek. Bu işlem sunucunuzun büyüklüğüne göre zaman alabilir.`) 
         
   
    });
    message.channel.send(bilgi).then(m => m.edit(bilgi))
   
    
  
    const rolalllog = new Discord.MessageEmbed()
    .setTitle("Bilgi")
    .setColor("RANDOM")
    .setFooter("dev by forcen")
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
    .setTimestamp()
    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
        .setDescription(`${message.author} tarafından herkese rol verme komutu kullanıldı. \n
        Verilen rol ${rol} \n
        Rol verilen kişi sayısı ${sayaç}
        
        
        `)
        const rolalllogkanali = message.guild.channels.cache.get(logconfig.allrolelog)
        rolalllogkanali.send(rolalllog)
   
  }


 
}



