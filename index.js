const Discord = require("discord.js");
const newUsers = new Discord.Collection();
const client = new Discord.Client();
var PREFIX = ("!");
  
 
//Connexion du bot
client.on('ready', () => {
    client.user.setActivity("Help");
    console.log(`Connecté en tant que ${client.user.tag} (${client.user.id}) sur ${client.guilds.size} serveur(s).`);
  });
 



client.on('message', function (message) {
 
  if (message.author.equals(client.user)) return;
  
  if (!message.content.startsWith(PREFIX)) return;

  var args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0].toLowerCase()) {
      case "ping":
          message.channel.sendMessage("Pong !");
          break;
      case "help":
          message.channel.sendMessage("Liste des commandes: \n /help");
          break;
      case "twitch":
          message.channel.sendMessage("https://www.twitch.tv/mickagamer_");
          break;
      case "twitter":
          message.channel.sendMessage("https://twitter.com/micka69_");
          break;
      case "youtube":
          message.channel.sendMessage("https://www.youtube.com/channel/UCNzfQX6qJCyINXERTm8pPMw");
          break;
  }
});
 
 
// MESSAGE DE BIENVENUE ET DEPART
client.on('guildMemberAdd', member => {
  client.channels.get(process.env.IDCHANNEL).send('Bienvenue, ' + member.user.username);
  member.createDM().then(channel => {
    return channel.send('Bienvenue sur le serveur ' + member.displayName)
  }).catch(console.error)
});
client.on('guildMemberRemove', member => {
  client.channels.get(process.env.IDCHANNEL).send('Au revoir, ' + member.user.username);
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

// TOKEN BOT
client.login(process.env.TOEKN);
