const Discord = require("discord.js");
const newUsers = new Discord.Collection();
const client = new Discord.Client();
/*const config = require("./config.json");*/
const responseObject = {
  "twitch": "mickagamer_",
  "twitter": "@micka69_"
};
 

var prefix = ("!");
var PREFIX = ("!");

 

 
 

 
//Connexion du bot
client.on('ready', () => {
    client.user.setActivity("Help");
    console.log(`Connecté en tant que ${client.user.tag} (${client.user.id}) sur ${client.guilds.size} serveur(s).`);
  });

//Réponse du bot avec commandes
client.on("message", (message) => {
  if(responseObject[message.content]) {
    message.channel.send(responseObject[message.content]);
  }
});
//réponse du bot simple
client.on('message', function (message){
    if (message.content === 'coucou'){
        message.reply ('coucou')
    }
    if (message.content === 'ping') {
      message.reply('pong !')
    }
});

 //COMMANDE HELP
client.on('message', message => {
  if (message.content === prefix + "help"){
      message.channel.sendMessage("Liste des commandes: \n /help");
  }
});

// MESSAGE DE BIENVENUE - DEPART
client.on('guildMemberAdd', member => {
  client.channels.get('458325201478877197').send('Bienvenue, ' + member.user.username);
  member.createDM().then(channel => {
    return channel.send('Bienvenue sur le serveur ' + member.displayName)
  }).catch(console.error)
});
client.on('guildMemberRemove', member => {
  client.channels.get('458325201478877197').send('Au revoir, ' + member.user.username);
});

//COMMANDE KICK
client.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith('!kick')) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.kick('Optional reason that will display in the audit logs').then(() => {
          message.reply(`Kick effectué correctement sur ${user.tag}`);
        }).catch(err => {
          message.reply('Je suis désolé, mais je ne peux pas kicker ce membre !');
          console.error(err);
        });
      } else {
        message.reply('Ce membre ne fait pas parti du serveur !');
      }
    } else {
      message.reply('Vous n\'avez pas mentionné l\'utilisateur pour le kick !');
    }
  }
});
//COMMANDE BAN
client.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith('!ban')) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.ban('Optional reason that will display in the audit logs').then(() => {
          message.reply(`Ban effectué correctement sur ${user.tag}`);
        }).catch(err => {
          message.reply('Je suis désolé, mais je ne peux pas bannir ce membre !');
          console.error(err);
        });
      } else {
        message.reply('Ce membre ne fait pas parti du serveur !');
      }
    } else {
      message.reply('Vous n\'avez pas mentionné l\'utilisateur pour le ban !');
    }
  }
});
// COMMANDE PURGE
client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
if(command === "purge") {
  const deleteCount = parseInt(args[0], 10);
  if(!deleteCount || deleteCount < 2 || deleteCount > 100)
    return message.reply("Merci d\'indiquer entre 2 et 100 le nombre de messages a effacer !");
  const fetched = await message.channel.fetchMessages({limit: deleteCount});
  message.channel.bulkDelete(fetched)
    .catch(error => message.reply(`Impossible d\'efface: ${error}`));
}
});

client.login(process.env.TOEKN);
