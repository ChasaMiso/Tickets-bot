import { SlashCommandBuilder, ChannelType, TextChannel, EmbedBuilder, ColorResolvable, ApplicationCommandChoicesData, ActionRowBuilder, ActionRow, ClientUser, Client, Collector } from "discord.js"
import { SlashCommand } from "../types";
import { ButtonBuilder } from "discord.js";
import { ButtonStyle } from "discord.js";

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName("panel")
    .setDescription("Create a new panel message.")
    .addStringOption(option => {
      return option
        .setName("title")
        .setDescription("Title of the panel message")
        .setRequired(true);
    })
    .addStringOption(option => {
      return option
        .setName("description")
        .setDescription("Description of the panel message.")
        .setRequired(true);
    })
    .addChannelOption(option => {
      return option
        .setName("channel")
        .setDescription("Text channel where the embed message will be sent.")
        .setRequired(true);
    })
  ,
  execute: async (interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true });
      if (!interaction.options) return interaction.editReply({ content: "Something went wrong..." });
      const title = interaction.options.get("title")!
      const description = interaction.options.get("description")!
      const channel = interaction.options.get("channel")!
      const embed = new EmbedBuilder()
        .setTitle(title.value!.toString())
        .setDescription(description.value!.toString())
        .setTimestamp()
        .setFooter({ text: "Make a ticket!" });
      let selectedTextChannel = interaction.channel?.client.channels.cache.get(channel.channel!.id) as TextChannel
      const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('helpbtn')
                .setLabel('Help')
                .setStyle(ButtonStyle.Primary),
        );
      selectedTextChannel.send({ embeds: [embed], components:[row] });
      return interaction.editReply({ content: "Embed message successfully sent." })
    } catch (error) {
      interaction.editReply({ content: "Something went wrong..." });
      console.log(error)
    }

  },
  cooldown: 10
}

export default command