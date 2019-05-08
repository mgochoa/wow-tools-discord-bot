require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const { RichEmbed } = require("discord.js")

/*fs.readdir("./events/", (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventHandler(client, ...args));
  });
});*/

client.on('message', message => {
    switch (message.content) {
        case '!mdt list':
            const embed = new RichEmbed()
                // Set the title of the field
                .setTitle('List of dungeons')
                // Set the color of the embed
                .setColor(0xFF0000)
                .setDescription("1. Ataldazar\n2. Ataldazar\n\n *Type a selection or cancel*")

            message.channel.send(embed);
            break;
    }
})

client.login(process.env.BOT_TOKEN);