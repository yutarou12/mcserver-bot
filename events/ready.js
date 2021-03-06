const discord = require('discord.js');
const config = require('../config.json');
exports.run = (client) => {
    console.log(`[ Node: ${process.version} | Discord.js: ${discord.version}]\nConnected as: ${client.user.username} (ID: ${client.user.id})`);
    client.user.setActivity(` ONLINE | ${config.prefix}help`, { type: 'PLAYING' });
}