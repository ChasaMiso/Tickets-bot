import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, EmbedBuilder, PermissionsBitField } from "discord.js";
import EventEmitter from "node:events";
import TicketModel from "../schemas/Ticket";

export class TicketManager extends EventEmitter {
    client: any;

    /**
	 * Create a TicketManager instance
	 * @param {import('..').Bot} client
	 */

    constructor(client: any){
        super()
        this.client = client;
    }

    async create(guild_id: any, creator_id:string, category_id: string){
        try{
            const guild = this.client.guilds.cache.get(guild_id);
            const creator = await guild.members.fetch(creator_id);
            const name = creator.displayName

            const t_channel = await guild.channels.create({
                name: `ticket-${name}`,
                parent: category_id,
                type: ChannelType.GuildText
            })
            const date = Date.now()

            let newTicket = new TicketModel({
              guildID: guild.id,
              ticketID: t_channel.id,
              creatorID: creator_id,
              createdAt: date
            })
            newTicket.save()

            t_channel.permissionOverwrites.set([
                {
                  id: creator_id,
                  allow: [PermissionsBitField.Flags.SendMessages],
                }, {
                   id: creator_id,
                  allow: [PermissionsBitField.Flags.ViewChannel],
                }, {
                   id: creator_id,
                  allow: [PermissionsBitField.Flags.ReadMessageHistory]
                }, {
                   id: creator_id,
                  allow: [PermissionsBitField.Flags.AttachFiles]
                },{
                   id: guild_id,
                   deny: [PermissionsBitField.Flags.ViewChannel]
                 },
              ]);

              const embed = new EmbedBuilder()
              .setTitle("Support")
              .setDescription(`Hello <@${creator_id}>, thank you for contacting support. We will make sure you get your problem solved in no time.`)
              .addFields({
                name:"**Privacy**:",
                value:`We will ensure that this ticket is private and no information will be available to the public. if you find a staff abusing, please report it to a high staff!`
              })
              .setColor("Random")

              const row = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('closeticketbtn')
                        .setLabel('Close')
                        .setStyle(ButtonStyle.Danger),
                    new ButtonBuilder()
                        .setCustomId("claimticketbtn")
                        .setLabel("Claim")
                        .setStyle(ButtonStyle.Success)
                );

              t_channel.send({
                embeds:[embed],
                components:[row]
              })


        } catch(err){
            console.log(err)
        }
    }

    async close(guild_id:any, channel_id: any){
        try{
            const guild = this.client.guilds.cache.get(guild_id);
            const channel = guild.channels.cache.get(channel_id)
            channel.delete()

        }catch(err){
            console.log(err)
        }
    }
}