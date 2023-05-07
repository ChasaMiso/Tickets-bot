import { Schema, model } from "mongoose";
import { IBlacklistedUser } from "../types";

const BlacklistedUserSchema = new Schema<IBlacklistedUser>({
    guildID: {required:true, type: String},
    userID: {required:true, type: String}
})

const BlacklistedUserModel = model("blacklisted", BlacklistedUserSchema)

export default BlacklistedUserModel
