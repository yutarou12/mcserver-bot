const discord = require('discord.js');
const client = new discord.Client({ws : { intents: Discord.Intents.ALL } });
const token = require('./config.json').token
const fs = require('fs');

fs.readdir(`./events/`, (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      let eventFunction = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
  });

client.login(token)
