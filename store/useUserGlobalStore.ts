import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IAuthenticatedUser } from "../types";

interface IUserGlobalStore {
    user: IAuthenticatedUser | null;
    updateUser: (user: IAuthenticatedUser | null) => void;
}

const useUserGlobalStore = create<IUserGlobalStore>()(
    persist(
        (set, get) => ({
            user: null,
            updateUser: (user: IAuthenticatedUser | null) => {
                set({ user });
                if (user) {
                    console.log("Logged in user email: ", user.email);
                    console.log("Logged in user ID: ", user._id);
                }
            },
        }),
        {
            name: "chatapp-store", // Bu isimle AsyncStorage'de bilgiler saklanacak
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useUserGlobalStore;