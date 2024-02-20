import mongoose from "mongoose";

const blackListTokenSchema = new mongoose.Schema({
    token: String,

}, { timestamps: true });

const BlackListToken = mongoose.model('TokenBlackList', blackListTokenSchema);

export { BlackListToken };