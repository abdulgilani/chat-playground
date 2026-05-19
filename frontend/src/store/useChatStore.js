import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

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
    set({ isMessageLoading: false });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed at getting messages",
      );
    } finally {
      set({ isMessageLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.put(
        `/messages/send/${selectedUser._id}`,
        messageData,
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed at sending a message",
      );
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
