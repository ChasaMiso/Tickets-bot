import { Schema, model } from "mongoose";
import { ITicket } from "../types";

const TicketSchema = new Schema<ITicket>({
    guildID: {required:true, type: String},
    ticketID: {required:true, type: String},
    creatorID: {required:true, type: String},
    createdAt: {required:true, type: Date}
})

const TicketModel = model("ticket", TicketSchema)

export default TicketModel