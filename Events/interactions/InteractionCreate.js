const { CommandInteraction, ActionRowBuilder, ModalBuilder, TextInputBuilder, ChannelType, TextInputStyle, EmbedBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");
module.exports = {
    name: "interactionCreate",
  
    async execute(interaction, client) {
      const { customId, member, guild, user, channel, commandName, message } = interaction;
  
      if (interaction.isChatInputCommand()) {
        const command = client.commands.get(commandName);
        if (!command) {
          return interaction.reply('Outdated command', true )
        }
        command.execute(interaction, client);
      }

      if (interaction.isButton()) {
      }
    },
  };