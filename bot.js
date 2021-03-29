//Invite url
// https://discord.com/oauth2/authorize?client_id=823253773240893470&scope=bot&permissions=805314622

//TODO accent code
//Twitch recent follow, subscribe
//Twitch chat in discord and vice versa

const Discord           = require('discord.js')
const { token, prefix, url, accept, twitch_client_id  } = require("./config.json");
const request           = require('request');

const bot = new Discord.Client()

const queue = new Map();
const ytdl = require('ytdl-core');

bot.on('ready', function () {
  console.log("Je suis connecté !")
})

bot.on('message', async message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    const serverQueue = queue.get(message.guild.id);

    // Voice only works in guilds, if the message does not come from a guild,
    // we ignore it
    if (!message.guild) return;

    if(command === 'stream') {
      //Send message in specific channel
      //message.guild.channels.cache.get('823970107008745522').send('hello');
      
      var options = {
        url: url,
        method: 'GET',
        headers: {
          'Client-ID': twitch_client_id,
          'Accept': accept
        }
      };
    
      request(options, function (error, response, body) {
        if (response && response.statusCode == 200) {
          var data = JSON.parse(body);
          if(data.stream !== null) {
            const game = data.stream.game;
            const viewers = data.stream.viewers;
            const followers = data.stream.channel.followers;
            const totalViews = data.stream.channel.views;
            const previewImg = data.stream.preview.medium;
            const title = data.stream.channel.status;
            const streamStartedAt = data.stream.created_at;
            const url = data.stream.channel.url;
            const pictureProfile = data.stream.channel.logo;

            const streamEmbed = new Discord.MessageEmbed()
            .setAuthor(title, pictureProfile, url)
            .setImage(previewImg)
            .setTimestamp(streamStartedAt)
            .addField('Viewers', viewers, true)
            .addField('Followers', followers, true)
            .addField('Vues totales', totalViews, true)
            message.channel.send(streamEmbed);
          }
        }/* else {
          console.log(JSON.parse(body));
        }*/
      });
      
    }
  
    else if(command === 'social') {
      const socialEmbed = new Discord.MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle('Réseaux Sociaux')
	    .setURL('https://linktr.ee/alvanmusic')
	    .setDescription('Retrouvez tous les réseaux sociaux d\'Alvan !')
	    .addField('Instagram', 'https://www.instagram.com/alvanmusic')
      .addField('Facebook', 'https://www.facebook.com/AlvanOff/')
      .addField('Twitter', 'https://twitter.com/alvan_music')
      .addField('Youtube', 'https://www.youtube.com/channel/UC8xMufdcKhTnjU96dPk0k2A?sub_confirmation=1')
      .addField('Spotify', 'https://open.spotify.com/artist/25OslGicPT7wGn5Ovf4Uwx')
      .addField('Deezer', 'https://www.deezer.com/fr/artist/6257124')
      .addField('SoundCloud', 'https://soundcloud.com/alvan')
      message.channel.send(socialEmbed);
    }

    else if(command === 'hall') {
        const hallEmbed = new Discord.MessageEmbed()
        .setColor('#0ec969')
        .setTitle("Hall of Fame")
        .setDescription("Retrouvez tous les talents de la communauté !")
        .addField('!royalexdr', 'Graphiste de qualité premium !')
        .addField('!jibaymcs', 'Homme à tout faire !')
        message.channel.send(hallEmbed);
    }

    else if(command === 'royalexdr') {
      const royalexdrEmbed = new Discord.MessageEmbed()
      .setColor('#8a3ab9')
      .setAuthor('Alexandre Roy', 'https://instagram.fcdg2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/13395068_1000978916618113_1962319241_a.jpg?tp=1&_nc_ht=instagram.fcdg2-1.fna.fbcdn.net&_nc_ohc=WA0PqSvQnZ4AX-F32AE&ccb=7-4&oh=c34d754b6a05d60d2f5dd5c5b25e6ccd&oe=60814E03&_nc_sid=48a2a6', 'https://instagram.com/royalexdr')
      .setDescription('La Rochelle 🇨🇵\nroyalex.pro@gmail.com\nroyalexdr.tumblr.com')
      .setImage('https://instagram.fcdg2-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/122094886_920246628504862_3789101799645360850_n.jpg?tp=1&_nc_ht=instagram.fcdg2-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=lrZlQHu4jqAAX_yYps1&ccb=7-4&oh=cf61dfcf48f0cdab7b544ebbf9ed9f73&oe=608244A7&_nc_sid=4f375e', 'https://www.instagram.com/p/CGoABK3AqAG/')
      message.channel.send(royalexdrEmbed);
    }

    else if(command === 'jibaymcs') {
      const jibaymcsEmbed = new Discord.MessageEmbed()
      .setColor('#8a3ab9')
      .setAuthor('Jibay Mcs', 'https://instagram.fcdg2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/66174099_2380997361947207_5883414195411615744_n.jpg?tp=1&_nc_ht=instagram.fcdg2-1.fna.fbcdn.net&_nc_ohc=tmPtKvPR3W8AX_f8VeB&ccb=7-4&oh=f2b661b90d0afc981d03d168ed08a97c&oe=6084506E&_nc_sid=7bff83', 'https://instagram.com/jibaymcs')
      .setDescription('Lumberjack 🌳🌲\nMountains 🗻\nClimbing 🐒\nMusic 🎶\nProgramming 💾')
      .setImage('https://instagram.fcdg2-1.fna.fbcdn.net/v/t51.2885-15/e35/144159931_231147275217173_5338467382602461264_n.jpg?tp=1&_nc_ht=instagram.fcdg2-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=7VqCuwVj6mkAX8xrBvG&ccb=7-4&oh=5742c2a957aeae58ea59e40fb50f3af5&oe=6083B714&_nc_sid=4f375e', 'https://www.instagram.com/p/CKqwXQfHLPl/')
      message.channel.send(jibaymcsEmbed);
    }


    //TODO Fix logout error
    /*else if(command === "clearQueue") {
        while(songList.length > 0) {
            songList.pop();
            const queueEmbed = new Discord.MessageEmbed()
	        .setColor('#0099ff')
            setTitle("Playlist effac\u00e9e !")
        }
    }

    else if(command === 'stop') {
        stop(message, serverQueue);
    }

    else if (command === 'play') {
        execute(message, serverQueue);
    }

    else if(command == 'skip') {
        skip(message, serverQueue);
    }*/
  });

  /*async function execute(message, serverQueue) {
    const args = message.content.split(" ");
  
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send(
        "You need to be in a voice channel to play music!"
      );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send(
        "I need the permissions to join and speak in your voice channel!"
      );
    }
  
    const songInfo = await ytdl.getInfo(args[1]);
    const song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
     };
  
    if (!serverQueue) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      };
  
      queue.set(message.guild.id, queueContruct);
  
      queueContruct.songs.push(song);
  
      try {
        var connection = await voiceChannel.join();
        queueContruct.connection = connection;
        play(message.guild, queueContruct.songs[0]);
      } catch (err) {
        console.log(err);
        queue.delete(message.guild.id);
        return message.channel.send(err);
      }
    } else {
      serverQueue.songs.push(song);
      return message.channel.send(`${song.title} has been added to the queue!`);
    }
  }
  
  function skip(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      );
    if (!serverQueue)
      return message.channel.send("There is no song that I could skip!");
    serverQueue.connection.dispatcher.end();
  }
  
  function stop(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music!"
      );
      
    if (!serverQueue)
      return message.channel.send("There is no song that I could stop!");
      
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  }
  
  function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
  
    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
  }*/

bot.login(token);