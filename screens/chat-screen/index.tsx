import React, { useContext } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

import useUserGlobalStore from '../../store/useUserGlobalStore';
import PotentialChats from '../../src/components/chats/PotentialChats';
import UserChat from '../../src/components/chats/UserChat';
import { ChatContext } from '../../src/context/chatContext';


const ChatScreen = () => {
    const { user } = useUserGlobalStore();
    const { userChats, isUserChatsLoading, userChatsError } = useContext(ChatContext);

    if (isUserChatsLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (userChatsError) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Error: {userChatsError.message}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <PotentialChats />
            {userChats?.length ? (
                userChats.map((chat, index) => (
                    <UserChat key={index} chat={chat} user={user} />
                ))
            ) : (
                <Text style={styles.noChats}>No chats found.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: {
        color: 'red',
    },
    noChats: {
        color: 'grey',
    }
});

export default ChatScreen;