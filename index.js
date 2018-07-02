const Discord = require("discord.js");
const newUsers = new Discord.Collection();
const client = new Discord.Client();
const config = require("./config.json");
var prefix = ("!");


//Connexion du bot
client.on('ready', () => {
    client.user.setActivity("I.A.");
    console.log(`Connecté en tant que ${client.user.tag} (${client.user.id}) sur ${client.guilds.size} serveur(s).`);
  });

//Réponse du bot avec commandes
client.on("message", (message) => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  
    if (message.content.startsWith(config.prefix + "ping")) {
      message.channel.send("pong!");
    } else
    if (message.content.startsWith(config.prefix + "foo")) {
      message.channel.send("bar!");
    }
  });

//réponse du bot simple
client.on('message', function (message){
    if (message.content === 'coucou'){
        message.reply ('coucou')
    }
});

 //COMMANDE HELP
client.on('message', message => {
  if (message.content === prefix + "help"){
      message.channel.sendMessage("Liste des commandes: \n /help");
  }
});

//MESSAGE DE BIENVENUE en privée
client.on('guildMemberAdd', member => {
  member.createDM().then(channel => {
    return channel.send('Bienvenue sur mon serveur ' + member.displayName)
  }).catch(console.error)
});
 


 


client.login(config.token);
