const fetch = require('node-fetch');
exports.run = async(client, message, args) => {

    const slice = (array) => {
        const length = Math.ceil(array.length / 15)
        return new Array(length).fill().map((_, i) =>
        array.slice(i * 15, (i + 1) * 15)
        )
    }

    const await_msg = await message.channel.send("取得中です...")

    const urlll = "https://mcservers.jp/api/v1/category/list"
    
    fetch(urlll, {
        method: "GET"
    }).then(re1 => {
        re1.json().then(async clist => {

            const max_size = Math.ceil(clist.categories.length / 15)

            const options = { limit: 20 * 1000, min: 1, max: max_size, page: 1}
            const pages = {}

            for (let i = 0; i < max_size; i++) {
                pages[i+1] = {
                    title: "MCServer - Category List",
                    description: "/\\ "+ (slice(clist.categories.map(n => n.name))[i].toString().split(",").join("\n/\\ ")),
                    color: "26cc15",
                    footer:{ text : "Category Count : "+clist.categories.length }
                }
            }

            await await_msg.delete()
            
            const awaitReactions = async (message, m, options, filter) => {
                const { min, max, page, limit } = options;
                m.awaitReactions(filter, { max: 1, time: limit, errors: ['time'] })
                .then(async (collected) => {
                    const reaction = collected.first()
                    if (reaction.emoji.name === '⬅') {
                        await removeReaction(m, message, '⬅');
                        if (options.page != options.min) {
                            options.page = options.page - 1;
                            await m.edit(`\`\`\`\n${options.page}ページ目/${options.max}ページ目\n\`\`\``,{ embed: pages[options.page] });
                        }
                        awaitReactions(message, m, options, filter);
                    }else if (reaction.emoji.name === '➡') {
                        await removeReaction(m, message, '➡');
                        if (options.page != options.max) {
                            options.page = options.page + 1;
                            await m.edit(`\`\`\`\n${options.page}ページ目/${options.max}ページ目\n\`\`\``,{ embed: pages[options.page] });
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
            const m = await message.channel.send(`\`\`\`\n${options.page}ページ目/${options.max}ページ目\n\`\`\``,{ embed: pages[options.page] });
            await m.react('⬅');
            await m.react('🗑');
            await m.react('➡');
        
            const filter = (reaction, user) => {
                return ['⬅', '🗑','➡'].includes(reaction.emoji.name) && user.id == message.author.id;
            }
            awaitReactions(message, m, options, filter);
        
        })
    
    })
}