import { Embed, EmbedBuilder, Interaction, embedLength } from "discord.js";
import { BotEvent } from "../types";
import {TicketManager} from "../modules/manager"
import {client} from "../index"
import BlacklistedUserModel from "../schemas/BlacklistedUser";

const event : BotEvent = {
    name: "interactionCreate",
    execute: (interaction: Interaction) => {
        if (interaction.isChatInputCommand()) {
            let command = interaction.client.slashCommands.get(interaction.commandName)
            let cooldown = interaction.client.cooldowns.get(`${interaction.commandName}-${interaction.user.username}`)
            if (!command) return;
            if (command.cooldown && cooldown) {
                if (Date.now() < cooldown) {
                    interaction.reply(`You have to wait ${Math.floor(Math.abs(Date.now() - cooldown) / 1000)} second(s) to use this command again.`)
                    setTimeout(() => interaction.deleteReply(), 5000)
                    return
                }
                interaction.client.cooldowns.set(`${interaction.commandName}-${interaction.user.username}`, Date.now() + command.cooldown * 1000)
                setTimeout(() => {
                    interaction.client.cooldowns.delete(`${interaction.commandName}-${interaction.user.username}`)
                }, command.cooldown * 1000)
            } else if (command.cooldown && !cooldown) {
                interaction.client.cooldowns.set(`${interaction.commandName}-${interaction.user.username}`, Date.now() + command.cooldown * 1000)
            }
            command.execute(interaction)
        } else if (interaction.isAutocomplete()) {
            const command = interaction.client.slashCommands.get(interaction.commandName);
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
            try {
                if(!command.autocomplete) return;
                command.autocomplete(interaction);
            } catch (error) {
                console.error(error);
            }
        } else if(interaction.isButton()){
            console.log("button")
            console.log(interaction.component.label)
            if(interaction.component.label=="Help"){
                BlacklistedUserModel.find({userID: interaction.user.id}, function(err:any, obj:any) {   
                    try{
                        if(obj[0]?.userID == interaction.user.id){
                            return interaction.user.send('**You are blacklisted from making tickets!**')
                        }else{
                            console.log("tasdasd")
                            const tm = new TicketManager(client)
                            tm.create(interaction.guildId, interaction.user.id, "1104336175864500304")
                        }
                    } catch(err){
                        console.log(err)
                    }
                })
            } else if(interaction.component.label=="Claim"){
                const embed = new EmbedBuilder()
                .setTitle(`This ticket was claimed.`)
                .setDescription(`**Claimed by** <@${interaction.user.id}>`)
                .setColor("Random")
                .setTimestamp()

                interaction.channel?.send({embeds:[embed]})
            } else if(interaction.component.label=="Close"){
                const embed = new EmbedBuilder()
                .setTitle("Channel Deletion")
                .setDescription("**The channel will be deleted in 5 seconds!**")
                .setColor("Red")
                .setTimestamp()

                interaction.channel?.send({embeds:[embed]})

                setTimeout(()=>{
                    const tm = new TicketManager(client)
                    tm.close(interaction.guildId, interaction.channelId)
                }, 5000)
                
            }
        }
    }
}

export default event;
