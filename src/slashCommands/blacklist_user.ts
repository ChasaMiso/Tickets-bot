import { ChannelType, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";
import BlacklistedUserModel from "../schemas/BlacklistedUser";

const ClearCommand : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("blacklist")
    .setDescription("Blacklists a user from making tickets")
    .addUserOption(option => {
        return option
        .setRequired(true)
        .setName("member")
        .setDescription("User to blacklist")
    }),
    execute: interaction => {
        let memberOption:any = interaction.options.getUser("member")
        let member = memberOption.id
        const newBlacklist = new BlacklistedUserModel({
            guildID: interaction.guildId,
            userID: member
        })
        newBlacklist.save()
        interaction.reply({content:`<@${member}> has been blacklisted!`, ephemeral: true})
    },
    cooldown: 10
}

export default ClearCommand;
