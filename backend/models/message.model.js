import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        required: true
    },
    recieverId:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        required: true
    },
    message:{
        type: String,
        required: true
    }
    // createdAt, updatedAt => Member since <createdAt>
	}, {timestamps: true});

    const Message = mongoose.model("Message", messageSchema);

    export default Message;