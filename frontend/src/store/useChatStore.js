import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import { useAuthStore } from "./useAuthStore";
import { decryptMessage } from "../utils/encryption";

import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed at getting users");
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);

      const decryptedMessageList = res.data.map((message) => {
        const decryptedMsg = { ...message };

        if (decryptedMsg.text) {
          try {
            decryptedMsg.text = decryptMessage(decryptedMsg.text);
          } catch (error) {
            console.error(
              "Failed to decrypt a text message: ",
              message._id,
              error,
            );
            decryptedMsg.text = "[Decryption Error]";
          }
        }

        if (decryptedMsg.image) {
          try {
            decryptedMsg.image = decryptMessage(decryptedMsg.image);
          } catch (error) {
            console.error("Failed to decrypt an image: ", message._id, error);
            decryptedMsg.image = null;
          }
        }

        return decryptedMsg;
      });

      set({ messages: decryptedMessageList });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed at getting messages",
      );
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData,
      );

      const newMessage = { ...res.data };

      if (newMessage.text) {
        try {
          newMessage.text = decryptMessage(newMessage.text);
        } catch (error) {
          console.error(
            "Failed to decrypt a text message: ",
            newMessage._id,
            error,
          );
          newMessage.text = "[Decryption Error]";
        }
      }

      if (newMessage.image) {
        try {
          newMessage.image = decryptMessage(newMessage.image);
        } catch (error) {
          console.error("Failed to decrypt an image: ", newMessage._id, error);
          newMessage.image = null;
        }
      }

      set({ messages: [...messages, newMessage] });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed at sending a message",
      );
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  clearSelectedUser: () =>
    set({
      selectedUser: null,
    }),
}));
