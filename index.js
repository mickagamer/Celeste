const Discord = require('discord.js');
const client = new Discord.Client();

bot.login(process.env.TOKEN);

var prefix = ("/")

//BOT CONNECTION
client.on('ready', () => {
  client.user.setActivity("I.A.");
});

//COMMANDE HELP
client.on('message', message => {
    if (message.content === prefix + "help"){
        message.channel.sendMessage("Liste des commandes: \n -/help");
    }
});

//JEUX PING PONG
client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

//MESSAGE DE BIENVENUE
client.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
      return channel.send('Bienvenue sur mon serveur ' + member.displayName)
    }).catch(console.error)
  });

client.on('message', function (message){
    if (message.content === 'coucou'){
        message.reply ('coucou')
    }
});
