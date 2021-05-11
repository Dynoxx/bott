const Discord = require("discord.js");
const otoisimdb = require("quick.db");
const serverconfig = require("../configs/serverconfig.json");
const logconfig = require("../configs/logconfig.json"); 
const rolconfig = require("../configs/rolconfig.json");
const emojiconfig = require("../configs/emojiconfig.json");
const {prefix} = require("../configs/serverconfig.json");
module.exports = {
  name: "rolver",
  guildOnly: true,
  run:  async (message, member, args) =>  {
    const rollog = message.guild.channels.cache.get(logconfig.rolelog)
    signature = rolconfig.signature
    if(![(signature)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bunun için ayarlanmış yetkiye sahip değilsin <@&${signature}>`);
    let user = message.mentions.members.first() 
    if (!user) return  message.reply(`Birini etiketlemelisin => \`${prefix}rolver @üye @rol\``).catch(console.error);
    let rol = message.mentions.roles.first()  
    if (!rol) return message.reply(`Bir rol girmelisin => \`${prefix}rolver @üye @rol\``);
  user.roles.add(rol)
  const embed = new Discord.MessageEmbed()
          .setDescription(`${user} kullanıcısına başarıyla ${rol} rolü verildi!`)
          .setFooter('dev by forcen')
          .setColor("RANDOM")
          .setTimestamp()
      message.channel.send(embed)
      rollog.send(embed)
  }
  
}
