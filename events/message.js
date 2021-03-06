const config = require('../config.json');
exports.run = async(client, message) => {

    if(!message.guild) return;
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    
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
