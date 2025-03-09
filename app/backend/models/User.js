const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
    banned: { type: Boolean, default: "false" },
campaigns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Campaign" }],
  password: { type: String, required: true },
    accountID:{
      type:String,
      default:null,
   
    },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
