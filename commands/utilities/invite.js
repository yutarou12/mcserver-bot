exports.run = async(client, message, args, config) => {

    if(!message.guild) return;
    message.channel.send({
        embed:{
            fields:[
                {
                    name: "Bot", value: "[Click or Tap Here](https://discord.com/api/oauth2/authorize?client_id=715749654616080446&permissions=27712&scope=bot)\nPermission : 27712"
                },
                {
                    name: "MCServers.jp様", value: "https://mcservers.jp/"
                },
                {
                    name: "MCServers.jp様 OfficialTwitter", value: "[@mcserversjp](https://twitter.com/mcserversjp)"
                }
            ]
        }
    })
}