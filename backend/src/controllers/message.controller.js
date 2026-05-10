import User from '../models/user.model.js';
import Message from '../models/message.model.js';

import cloudinary from 'cloudinary';

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user_id;
        const filteredResults = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');

        res.status(200).json(filteredResults);
    } catch (error) {
        console.log("Error in getUsersForSidebar controller: ", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user_id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, revieverId: userToChatId },
                { senderId: userToChatId, revieverId: myId },
            ],
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error);
        res.status(500).json({ message: "Server error" });
    }
}