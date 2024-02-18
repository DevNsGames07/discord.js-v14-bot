const { ActivityType, EmbedBuilder } = require('discord.js');
const mongoose = require('mongoose');
const client = require("../../index")
require("colors");
const mongoURL = process.env.mongodb;


module.exports = {
    name: "ready",
    once: true,
    async execute(client) {

        const activities = [`Custimize your server`, `${client.guilds.cache.size} server!`];
        let i = 0;

        setInterval(() => client.user.setPresence({ activities: [{ name: activities[i++ % activities.length], type: ActivityType.Watching }] }), 15000);
        console.log(`[ONLINE]`.green + ` ${client.user.tag} is online in ${client.guilds.cache.size} servers! `);

        try {
            await mongoose.connect(process.env.mongodb, {});
            console.log("CONNECTED TO DATABASE SUCCESSFULLY");
        } catch (error) {
            console.error('COULD NOT CONNECT TO DATABASE:', error.message);
        }


    },
};
