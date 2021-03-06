const fetch = require('node-fetch');
exports.run = async(client, message, args) => {

    if(!message.guild) return;
    
    if (!args[0]) return message.channel.send( { embed : { description : "[server_id] を指定してください"} } )

    const urlll = `https://mcservers.jp/api/v1/server/details/${args[0]}`
    fetch(urlll, {
        method: "GET"
    }).then(response1 => {
        response1.json().then(async list1 => {
            if (list1.status === 0){
                message.channel.send({ embed:{ description : list1.errors.id.toString() } })
            }else{
            message.channel.send({
                embed:{
                    title: list1.server.name,
                    description: list1.server.description,
                    fields:[
                        {
                            name: "Address", value : list1.server.address, inline: true
                        },
                        {
                            name: "Port", value: list1.server.port, inline: true
                        },
                        {
                            name: "Version", value: list1.server.latest_ping.version, inline: true
                        },
                        {
                            name: "Ping", value: list1.server.latest_ping.millisecond + "ms", inline: true
                        },
                        {
                            name: "Player", value: list1.server.latest_ping.current_player + " / " + list1.server.latest_ping.max_player, inline: true
                        }
                    ]
                }
            })
        }
        })
    })
}