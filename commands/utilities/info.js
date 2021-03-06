exports.run = async(client, message, args, config) => {
    message.channel.send({
        embed:{
            title: "Bot - INFO",
            fields:[
                {
                    name: "ID", value: "```js\n"+client.user.id+"\n```", inline: true
                },
                {
                    name: "Overview", value: "```md\n# MCServerList BOT\n```", inline: true
                },
                {
                    name: "Developer", value: "```c\n# discord: yutarou1241477#7855\n```"
                },
                {
                    name: "Language", value: "```yml\nJavaScript\n```", inline: true
                },
                {
                    name: "Prefix", value: "```yml\n"+config.prefix+"\n```", inline: true
                },
                {
                    name: "API", value: "https://mcservers.jp/api"
                }
            ]
        }
    })
}