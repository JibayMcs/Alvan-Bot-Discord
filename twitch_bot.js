const { oauth_token_bot  } = require("./config.json");

const tmi = require('tmi.js');

const botUsername = 'jibaymcs';
const channelName = 'alvanmusic';

const opts = {
    identity: {
      username: botUsername,
      password: oauth_token_bot
    },
    channels: [
        channelName
    ]
  };

const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!discord') {
    client.say(target, 'Rejoins @alvanmusic et toute la clique sur Discord !\nhttps://discord.gg/5Uu3pMbd5W');
    console.log(`* Executed ${commandName} command`);
  }
  else if(commandName === '!spotify') {
    client.say(target, 'Écoute @alvanmusic sur Spotify !\nhttps://open.spotify.com/artist/25OslGicPT7wGn5Ovf4Uwx');
    console.log(`* Executed ${commandName} command`);
  }
  else if(commandName === '!deezer') {
    client.say(target, 'Écoute @alvanmusic sur Deezer !\nhttps://www.deezer.com/fr/artist/6257124');
    console.log(`* Executed ${commandName} command`);
  }
  else if(commandName === "!insta") {
    client.say(target, 'Follow @alvanmusic sur Instagram !\nhttps://www.instagram.com/alvanmusic/');
    console.log(`* Executed ${commandName} command`);
  }
  else if(commandName === "!yt") {
    client.say(target, 'Rejoins @alvanmusic sur Youtube !\nhttps://www.youtube.com/channel/UC8xMufdcKhTnjU96dPk0k2A?sub_confirmation=1');
    console.log(`* Executed ${commandName} command`);
  }
  else if(commandName === "!soundcloud") {
    client.say(target, 'Écoute @alvanmusic sur Soundcloud !\nhttps://soundcloud.com/alvan');
    console.log(`* Executed ${commandName} command`);
  }
  else if(commandName === '!facebook') {
    client.say(target, 'Rejoins @alvanmusic sur Facebook !\nhttps://www.facebook.com/AlvanOff/');
    console.log(`* Executed ${commandName} command`);
  }
  else if(commandName === '!salut') {
      const rnd = messages[(Math.random() * messages.length) | 0];
      client.say(target, rnd);
      console.log(`* Executed ${commandName} command`);
  }
  else if(commandName === '!royalexdr') {
    client.say(target, 'Le Poto Alexandre qui fait de beaux dessins !\nhttps://instagram.com/royalexdr\n Checkez son taff !');
    console.log(`* Executed ${commandName} command`);
  }
    else if(commandName === '!pub') {
    client.say(target, 'Voilà la pub !\nhttps://www.youtube.com/watch?v=3P1CnWI62Ik');
    console.log(`* Executed ${commandName} command`);
  }
  else {
    console.log(target);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

var messages = [
    "Salut à toi ! Installe toi ! Met toi bien !",
    "Hey ! La forme ? Met toi bien, bois un coup et chill un max !",
    "Salut toi ! Merci deta présence ! Pose toi au calme !",
    "On est pas bien là ? Pépère au calme ?",
    "Hey toi ! Pose toi au fond du siège ! Et chil un max !",
]

const randomMsg = Math.floor(Math.random() * messages.length);