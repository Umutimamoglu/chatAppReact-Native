import { View, Text, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { ChatContext } from '../../context/chatContext';

const PotentialChats = () => {
    const { potentialChats } = useContext(ChatContext);

    return (
        <View style={styles.container}>
            {potentialChats.length > 0 ? (
                potentialChats.map((chat, index) => (
                    <Text key={index} style={styles.chatText}>{chat.username}</Text>
                ))
            ) : (
                <Text style={styles.noChats}>No potential chats found.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    chatText: {
        color: 'white',
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 20,
        marginBottom: 5
    },
    noChats: {
        color: 'grey',
    }
});

export default PotentialChats;