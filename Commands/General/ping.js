const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Language = require("../../Schema/Languages")
const i18next = require('i18next');
const fs = require('fs');

i18next.init({
    lng: process.env.defaultLanguage,
    fallbackLng: process.env.defaultLanguage,
    resources: {
        en: {
            translation: JSON.parse(fs.readFileSync('./Locales/en.json', 'utf8')),
        },
    },
});

module.exports = {
   data: new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong!'),
   async execute(interaction, client) {

    const { guildId, guild } = interaction;
    
    const data = await Language.findOne({ Guild: guildId });
    const language = data && data.Language in i18next.options.resources ? data.Language : process.env.defaultLanguage;
    i18next.changeLanguage(language);

        const embed1 = new EmbedBuilder()
        .setTitle("**Ping Command**")
        .setThumbnail(guild.iconURL())
        .setDescription(i18next.t('ping'))
        .setColor("Red")
        .setFooter({ text: `Powered by ${client.user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp();

        
        let pingfinallyembed = (i18next.t('pingfinally'))
        .replace("<ping>", `${client.ws.ping}`);

        const embed2 = new EmbedBuilder()
        .setTitle("**Ping Command**")
        .setThumbnail(guild.iconURL())
        .setDescription(`${pingfinallyembed}`)
        .setColor("Green")
        .setFooter({ text: `Powered by ${client.user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp();

        const Buttons = new ActionRowBuilder().addComponents(

            new ButtonBuilder()
                .setCustomId("pinging")
                .setLabel("Ping")
                .setStyle(ButtonStyle.Primary)

        )

        const pingEmbedMessage = await interaction.reply({ embeds: [embed1], components: [Buttons] });

        const filter = i => i.customId === 'pinging' && i.user.id === interaction.user.id;
        const collector = pingEmbedMessage.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async interaction => {

                await interaction.update({ embeds: [embed2], components: [] });
        });
        collector.on('end', collected => {
            if (collected.size === 0) {
                pingEmbedMessage.edit({ content: 'No interaction was received in time.', components: [] });
            }
        });



   },
};