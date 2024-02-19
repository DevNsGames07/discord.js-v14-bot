const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
require("dotenv").config()
const { loadCommands } = require("./Handlers/cmd-handler")
const { loadEvents } = require("./Handlers/event-handler")

const client = new Client({ intents: [Object.keys(GatewayIntentBits)] });

client.commands = new Collection();


module.exports = client;


client.login(process.env.token).then(() => {
	loadCommands(client);
    loadEvents(client);

})