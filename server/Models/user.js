const mongoose = require("mongoose");
const db = mongoose.createConnection('mongodb+srv://robinkumardbg11:aPTJ!E8LbWEgZZf@first.qxoadwq.mongodb.net/hackfest?retryWrites=true&w=majority&appName=First');


const userlist=new mongoose.Schema({
    name:String,
    phone: Number,
    email:String,
    sent: Array,
    received: Array,
    all: Array,
    professional: Array,
    spam: Array,
    personal: Array
})

module.exports = db.model("users", userlist);