const mongoose = require('mongoose')

const chatModel = mongoose.Schema(
    {
        chatName :{type :
            String , trim:true},
        isGroupchat:{type :Boolean,default : false},
        users : [{
            type: mongoose.Schema.Types.ObjectId,
            ref : "User",
        },
    ],
    latestMessege: {
         type: mongoose.Schema.Types.ObjectId,
         ref : "Messege",
    },
    groupAdmin: {
         type: mongoose.Schema.Types.ObjectId,
         ref : "User",
    },
    },
    {
        timestamps: true,
    }
);
const chat = mongoose.model("chat" , chatModel);
module.exports = chat;
//chatName
//isGroupchat
//users
//latestMessege
// groupAdmin 