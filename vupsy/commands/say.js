const Discord = require("discord.js");
const otoisimdb = require("quick.db");
const serverconfig = require("../configs/serverconfig.json");
const logconfig = require("../configs/logconfig.json"); 
const rolconfig = require("../configs/rolconfig.json");
const emojiconfig = require("../configs/emojiconfig.json");
const {prefix} = require("../configs/serverconfig.json");
module.exports = {
    name: "say",
    guildOnly: true,
    run:  async (message) =>  {



var botkomutkanal = logconfig.botkomut


if(message.channel.id !== botkomutkanal) return message.channel.send(`<@${message.author.id}> ! Bu komutu sadece <#${botkomutkanal}> kanalında kullanabilirsin.`)

//// rol tanımlar
const member = message.guild.members.cache.get(serverconfig.sunucu);
let yetkicheck = rolconfig.registery
const bot = message.guild.roles.cache.get(rolconfig.botrol).members.size 
const booster = message.guild.roles.cache.get(rolconfig.boosterrol).members.size

const online = message.guild.members.cache.filter(u => u.presence.status != "offline").size
const boost_sayisi = message.guild.premiumSubscriptionCount
const boost_level = message.guild.premiumTier 
const toplam = message.guild.memberCount
const ses = message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b) 


const embed = new Discord.MessageEmbed()

.setColor('GREEN')
.setTimestamp()
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setFooter("developed by forcen")
 .setDescription(`
 ${emojiconfig.mavitac}  **Toplam Üye =** ${toplam}

 ${emojiconfig.yesiltik}  **Aktif Üye =** ${online}

 ${emojiconfig.diamond2}  **Booster Üye Sayısı =** ${booster}

 ${emojiconfig.diamond3}  **Boost Sayısı =** ${boost_sayisi}

 ${emojiconfig.diamond}  **Boost Level Sayısı =** ${boost_level}

 ${emojiconfig.alevyesil}   **Seslideki Üye =** ${ses}

 ${emojiconfig.botdev}  **Bot Sayısı =** ${bot}


`);

message.channel.send(embed)
}}

