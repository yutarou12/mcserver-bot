const config = require('../config.json');
exports.run = async(client, message) => {

    if(!message.guild) return;
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
      
    if(!message.guild.members.cache.get(client.user.id).hasPermission("ADD_REACTIONS") 
    || !message.guild.members.cache.get(client.user.id).hasPermission("EMBED_LINKS") 
    || !message.guild.members.cache.get(client.user.id).hasPermission("MANAGE_MESSAGES")
    || !message.guild.members.cache.get(client.user.id).hasPermission("SEND_MESSAGES")) return message.channel.send({
        embed:{
            description:"コマンドを使用するには以下の権限が必要です\n```\n・メッセージの送信\n・メッセージの管理\n・リアクションの追加\n・埋め込みリンク\n```"
        }
    })
    
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();  
    
    try {
        let comFile = require(`../commands/${command}.js`);
        comFile.run(client, message, args, config);
    } catch (err) {
        try {
            let utlFile = require(`../commands/utilities/${command}.js`);
            utlFile.run(client, message, args, config);
        } catch (err) {
        }try {
            let admFile = require(`../commands/admins/${command}.js`);
            admFile.run(client, message, args, config); 
        } catch (err) {

        }
    }
}
