import { ChannelType, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";

const ClearCommand : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("blacklist")
    .setDescription("Blacklists a user from making tickets")
    .addUserOption(option => {
        return option
        .setName("member")
        .setDescription("User to blacklist")
    }),
    execute: interaction => {
        let memberOption:any = interaction.options.getUser("member")
        let member = interaction.guild?.members.cache.get(memberOption.id)
        member?.roles.add("1104872107780874301")
        interaction.reply({content:"User Blacklisted", ephemeral: true})
    },
    cooldown: 10
}

export default ClearCommand;