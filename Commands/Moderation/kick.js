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
	.setName('kick')
	.setDescription('Kick a user from the server!')
    .addUserOption(option =>
        option.setName("user")
        .setDescription("Select a users")
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName("reason")
        .setDescription("Give a reason")
        .setRequired(false)
    ),
   async execute(interaction, client) {

    const { guildId, guild } = interaction;
    
    const data = await Language.findOne({ Guild: guildId });
    const language = data && data.Language in i18next.options.resources ? data.Language : process.env.defaultLanguage;
    i18next.changeLanguage(language);

    
    const member = interaction.options.getMember("user")
    const reasonkick = interaction.options.getString("reason") || "No reason provided"

        const embed1 = new EmbedBuilder()
        .setTitle("**Kick Systeem**")
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .addFields(
            { name: `Persoon:`, value: `${member}`, inline: true },
            { name: `Reason:`, value: `${reasonkick}`, inline: true }
        )
        .setColor("Blue")
        .setFooter({ text: `Powered by ${client.user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp();

        member.kick(reasonkick)

        return interaction.reply({ embeds: [embed1] })



   },
};