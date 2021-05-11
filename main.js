const Discord = require("discord.js")     
const client = new Discord.Client();       
const serverconfig = require("./vupsy/configs/serverconfig.json")   
const logconfig = require("./vupsy/configs/logconfig.json") 
const rolconfig = require("./vupsy/configs/rolconfig.json")
const {prefix} = require("./vupsy/configs/serverconfig.json")
const emojiconfig = require("./vupsy/configs/emojiconfig.json")
const fs = require("fs");    
const moment = require("moment");            
require('./vupsy/util/Loader.js')(client);
require('./vupsy/events/guildMemberAdd.js')(client);
client.commands = new Discord.Collection(); 
client.aliases = new Discord.Collection();  
const cooldowns = new Discord.Collection();

 const commandFiles = fs.readdirSync("./vupsy/commands/").filter(file => file.endsWith(".js"));
 console.log(`${commandFiles.length} Komut Yükleniyor...`); 
 commandFiles.forEach(file => {
  
    const command = require(`./vupsy/commands/${file}`)
    client.commands.set(command.name, command);
    
     
  
    
 });
 console.log(`Pirates Online ❤️`)  

     

//LOGİN//
client.login(serverconfig.token)
//LOGİN


client.on('message', (message) => {
 
 const args = message.content.slice(prefix.length).trim().split(/ +/)
 const commandName = args.shift().toLowerCase();
 
 const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));


 if(!message.content.startsWith(prefix) || !command) return; 

 if((command.guildOnly === true) && (message.channel.type === "dm")) return message.reply("Komutu Sadece Sunucuda Kullan!");
 
if(!cooldowns.has(command.name)){
  cooldowns.set(command.name, new Discord.Collection());
}
const timestamps = cooldowns.get(command.name)
const now = Date.now();
const cooldownAmount = (command.cooldown || 5) * 1000;
  if(timestamps.has(message.author.id)){
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    if(expirationTime > now){
       const timeLeft = (expirationTime - now) / 1000;
       return message.channel.send(`Bu komutu tekrar kullanabilmek için ${parseInt(timeLeft)} saniye bekleyin.`);
       
    }
  }
timestamps.set(message.author.id, now);
setTimeout(() => {  
  timestamps.delete(message.author.id);

}, cooldownAmount);



try{
  command.run(message,args);
}
catch(e){
  console.log(e);
  message.channel.send("Hata Oluştu");
}



})
 
