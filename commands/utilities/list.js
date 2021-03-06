const fetch = require('node-fetch');
exports.run = async(client, message, args) => {

    if(!message.guild) return;
    
    const slice = (array) => {
        const length = Math.ceil(array.length / 13)
        return new Array(length).fill().map((_, i) =>
        array.slice(i * 13, (i + 1) * 13)
        )
    }

    const urlll = "https://mcservers.jp/api/v1/server/list"
    fetch(urlll, {
        method: "GET"
    }).then(response1 => {
        response1.json().then(async list1 => {

            const listt = []
            
            list1.servers.map(n => {
                listt.push("/\\ "+n.name + " : " + n.id)
            })

            if (list1.servers.length <= 13){
                var maxx = 1
            }else if (list1.servers.length > 13 && list1.servers.length <= 26){
                var maxx = 2
            }else if (list1.servers.length > 26 && list1.servers.length <= 39){
                var maxx = 3
            }else if (list1.servers.length > 39 && list1.servers.length <= 52){
                var maxx = 4
            }else if (list1.servers.length > 52 && list1.servers.length <= 65){
                var maxx = 5 
            }else if (list1.servers.length > 65 && list1.servers.length <= 77){
                var maxx = 6
            }

            const options = { limit: 20 * 1000, min: 1, max: maxx, page: 1}
            const pages = {
                1: {
                    title: "MCServer - Public List",
                    description: (slice(listt)[0].toString().split(",").join("\n")),
                    color: "26cc15",
                    footer:{ text : "  Server Count : "+list1.servers.length } 
                },
                2: {
                    title: "MCServer - Public List",
                    description: (slice(listt)[1].toString().split(",").join("\n")),
                    color: "26cc15",
                    footer:{ text : "  Server Count : "+list1.servers.length } 
                },
                3: {
                    title: "MCServer - Public List",
                    description: (slice(listt)[2].toString().split(",").join("\n")),
                    color: "26cc15",
                    footer:{ text : "  Server Count : "+list1.servers.length } 
                },
                4: {
                    title: "MCServer - Public List",
                    description: (slice(listt)[3].toString().split(",").join("\n")),
                    color: "26cc15",
                    footer:{ text : "  Server Count : "+list1.servers.length } 
                },/*
                5: {
                    title: "MCServer - Public List",
                    description: (slice(listt)[4].toString().split(",").join("\n")),
                    color: "26cc15",
                    footer:{ text : "  Server Count : "+list1.servers.length } 
                },
                */
            }

            const awaitReactions = async (message, m, options, filter) => {
                const { min, max, page, limit } = options;
                m.awaitReactions(filter, { max: 1, time: limit, errors: ['time'] })
                .then(async (collected) => {
                    const reaction = collected.first()
                    if (reaction.emoji.name === '⬅') {
                        await removeReaction(m, message, '⬅');
                        if (options.page != options.min) {
                            options.page = options.page - 1;
                            await m.edit("```"+options.page+"ページ目/4ページ目```",{ embed: pages[options.page] });
                        }
                        awaitReactions(message, m, options, filter);
                    }else if (reaction.emoji.name === '➡') {
                        await removeReaction(m, message, '➡');
                        if (options.page != options.max) {
                            options.page = options.page + 1;
                            await m.edit("```"+options.page+"ページ目/4ページ目```",{ embed: pages[options.page] });
                        }
                        awaitReactions(message, m, options, filter);
                    }else if (reaction.emoji.name === '🗑') {　
                        m.delete();
                    }else {　awaitReactions(message, m, options, filter);　};    
                }).catch(() => {});
            }
            const removeReaction = async (m, message, emoji) => {
                try { 
                    m.reactions.cache.find(r => r.emoji.name == emoji).users.remove(message.author.id); 
                } catch(err) {}
            }

            const m = await message.channel.send("```"+options.page+"ページ目/4ページ目```",{ embed: pages[options.page] });
            await m.react('⬅');
            await m.react('🗑');
            await m.react('➡');
    
            const filter = (reaction, user) => {
                return ['⬅', '🗑','➡'].includes(reaction.emoji.name) && user.id == message.author.id;
            }
            awaitReactions(message, m, options, filter);
            
        })
        
    }).catch((err) => {
        message.channel.send("[ERROR]\n"+err)
        const ch = client.channels.cache.get("716461744184361010")
        ch.send({
            title: "ERROR - "+ err.name,
            description: err.message,
            footer:{
                text: "guild: "+message.guild.name+" | user: "+message.author.tag
            }
        })
    })
}