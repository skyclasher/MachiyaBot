const fs = require("fs")
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.login(config.token);

client.on("ready", () => {
  console.log('Ready to serve in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.');
});

client.on("message", (message) => {
  // Set the prefix
  let prefix = config.prefix;
  // Exit and stop if the prefix is not there or if user is a bot
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.startsWith(prefix + "ping")) {
    message.channel.send("pong!");
  } else
  if (message.content.startsWith(prefix + "foo")) {
    message.channel.send("bar!");
  }
  
	if(message.content.startsWith(prefix + "prefix")) {
		// Gets the prefix from the command (eg. "!prefix +" it will take the "+" from it)
		let newPrefix = message.content.split(" ").slice(1, 2)[0];
		// change the configuration in memory
		prefix = newPrefix;
		config.prefix = prefix;
		// Now we have to save the file.
		fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
	}
	
	//if(message.author.id !== config.ownerID) return; for owner id
  
});