exports.run = async(client, message, args) => {
    if(message.author.id !== "534994298827964416") return;
    if(!message.guild) return;

    message.channel.send(client.guilds.cache.map(d => d.name))
}