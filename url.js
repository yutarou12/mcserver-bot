const discord = require('discord.js');
const client = new discord.Client();
const config = require('./config.json');

client.on("ready" ,() => {
    console.log("URL login")
})

client.on("message" , async message =>{

    var t,y,mo,d,h,m,s,nowtime;
	function time(){
		process.env.TZ = 'Asia/Tokyo';
		t=new Date()
		y=t.getFullYear();
  		mo=t.getMonth();
 		mo=(mo + 1);
  		d=t.getDate();
  		h=t.getHours();
  		h=('0'+h).slice(-2);
  		m=t.getMinutes();
  		m=('0'+m).slice(-2);
  		s=t.getSeconds();
		s=('0'+s).slice(-2);
        nowtime=y+'/'+mo+'/'+d+' | '+h+':'+m+':'+s;
	}

    const re = new RegExp('https://discordapp.com/channels/([0-9]{18})/([0-9]{18})/([0-9]{18})')
    const results = message.content.match(re)
    if (!results) { return }

    const guild_id = results[1]
    const channel_id = results[2]
    const message_id = results[3]

    time();
    const channel = client.channels.cache.get(channel_id);
    if (!channel){
      return;
	}
	
    channel.messages.fetch(message_id)
    .then( msg => message.channel.send({
        embed:{
            author:{ name: msg.author.tag, icon_url : msg.author.avatarURL({ format: 'png', dynamic: true }) },
            description: msg.content,
            footer: { text: "Channel : "+channel.name + " | " + nowtime, url: message.guild.iconURL({ format: 'png', dynamic: true }) }
        }
	})).catch(console.error);
})

client.login(config.token)