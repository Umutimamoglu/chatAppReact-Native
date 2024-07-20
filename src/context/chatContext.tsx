// src/context/chatContext.tsx
import React, { createContext, ReactNode, useState, useEffect } from "react";
import { IAuthenticatedUser } from "../../types";
import { BASE_URL, getRequest } from "../../service/config";

interface ChatContextProviderProps {
    children: ReactNode;
    user: IAuthenticatedUser; // Kullanıcı bilgilerini prop olarak alacak
}

// Context initial state tanımı
const initialState = {
    userChats: [],
    isUserChatsLoading: false,
    userChatsError: null,
    potentialChats: [],
};

export const ChatContext = createContext<{
    userChats: any[];
    isUserChatsLoading: boolean;
    userChatsError: Error | null;
    potentialChats: any[];
}>(initialState);

export const ChatContextProvider: React.FC<ChatContextProviderProps> = ({ children, user }) => {
    const [userChats, setUserChats] = useState<any[]>([]);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState<Error | null>(null);
    const [potentialChats, setPotentialChats] = useState<any[]>([]);

    useEffect(() => {
        const getUserChats = async () => {
            if (!user?._id) return;
            setIsUserChatsLoading(true);
            try {
                const response = await getRequest(`${BASE_URL}/api/chats/${user._id}`);
                if (response.error) {
                    setUserChatsError(new Error('Error fetching chats: ' + response.error));
                } else {
                    setUserChats(response);
                }
            } catch (error) {
                setUserChatsError(new Error('Network error: ' + error.message));
            } finally {
                setIsUserChatsLoading(false);
            }
        };
        getUserChats();
    }, [user?._id]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await getRequest(`${BASE_URL}/api/users`);
                if (response.error) {
                    console.error("Error fetching users:", response.error);
                    return;
                }
                const pChats = response.filter((u) => {
                    return !userChats.some((chat) => chat.members.includes(u._id));
                });
                setPotentialChats(pChats);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        if (userChats.length > 0) getUsers();
    }, [userChats]);

    return (
        <ChatContext.Provider value={{
            userChats,
            isUserChatsLoading,
            userChatsError,
            potentialChats,
        }}>
            {children}
        </ChatContext.Provider>
    );
};