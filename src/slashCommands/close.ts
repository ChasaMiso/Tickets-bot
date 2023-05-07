import { ChannelType, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";

const ClearCommand : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("close")
    .setDescription("Closes the ticket!"),
    execute: interaction => {
        const channel_id = interaction.channelId
        const guild = interaction.guild
        const channel = guild?.channels.cache.get(channel_id)
        const embed = new EmbedBuilder()
                .setTitle("Channel Deletion")
                .setDescription("**The channel will be deleted in 5 seconds!**")
                .setColor("Red")
                .setTimestamp()

                interaction.channel?.send({embeds:[embed]})

        return setTimeout(()=>{
            channel?.delete()
        }, 5000)
    },
    cooldown: 10
}

export default ClearCommand;