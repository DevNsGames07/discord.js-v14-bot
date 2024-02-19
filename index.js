const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
require("dotenv").config()
const { loadCommands } = require("./Handlers/cmd-handler")
const { loadEvents } = require("./Handlers/event-handler")

const client = new Client({ intents: [Object.keys(GatewayIntentBits)] });

client.commands = new Collection();

// Music System

const { DisTube } = require("distube");

const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');


client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnFinish: true,// you can change this to your needs
  emitAddSongWhenCreatingQueue: false,
  plugins: [new SpotifyPlugin()]
});

module.exports = client;


client.login(process.env.token).then(() => {
	loadCommands(client);
    loadEvents(client);

})