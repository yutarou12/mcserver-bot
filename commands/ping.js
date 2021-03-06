exports.run = (client, message) => {
    message.channel.send({
        embed: {
            color: "e0864b",
            description: 'Pong! - API Lantancy : ' + `${client.ws.ping}` + ' ms',
        }
    });
};