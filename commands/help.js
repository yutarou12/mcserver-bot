exports.run = async(client, message, args) => {

    if(!message.guild) return;
    message.channel.send({
        embed:{
            title: "MCServers Bot - HELP",
            fields:[
                {
                    name: "Bot", value: "`help, ping, info, invite`"
                },
                {
                    name: "MCServers", value: "`list, clist, onlines, search`"
                },
                {
                    name: "`mc!list`が動かない場合", value: "権限が足りてない可能性がありますので\nBotを入れなおしてみてください。"
                },
                {
                    name: "お知らせ", value: "サブ機能としてメッセージ展開機能を実装しました。"
                }
            ],
            footer:{
                text: "MCServers Bot | "+ new Date().toLocaleString()
            }
        }
    })
}