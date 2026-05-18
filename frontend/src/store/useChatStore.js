import { create } from zustand;
import { axiosInstance } from '../utils/axios';

export const useChatStore = create((set, get) => ({
    users: [],
    isUserLoading: false,

    getUsers: async () => {
        set({isUserLoading: true })
        try{
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUserLoading: false});
        }
    },

    getMessages: async() => {

    },

    sendMessages: async() => {

    },
}));