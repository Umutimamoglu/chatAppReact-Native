import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useFetchRecipientUser } from '../../hooks/useFetchRecipientUser';

const UserChat = ({ chat, user }) => {
    const { recipientUser, error } = useFetchRecipientUser(chat, user);

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error fetching user: {error.message}</Text>
            </View>
        );
    }

    return (
        <View style={styles.userContainer}>
            <Text style={styles.userName}>{recipientUser ? recipientUser.name : 'Loading...'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    userContainer: {
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 20,
        marginHorizontal: 5
    },
    userName: {
        color: 'white',
    },
    errorContainer: {
        padding: 10,
        backgroundColor: 'red',
    },
    errorText: {
        color: 'white',
    }
});

export default UserChat;