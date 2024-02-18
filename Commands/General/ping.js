const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
   data: new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong!'),
   async execute(interaction, client) {

        const embed1 = new EmbedBuilder()
        .setTitle("**Ping Command**")
        .setDescription("Wacht op interactie op de knop")
        .setColor("Red")
        .setTimestamp();

        const embed2 = new EmbedBuilder()
        .setTitle("**Ping Command**")
        .setDescription(`Ping: ${client.ws.ping} ms`)
        .setColor("Green")
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