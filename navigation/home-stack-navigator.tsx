
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { HomeStackParamlist } from "./types"
import HomeScreen from "../screens/home-screen"
import ChatScreen from "../screens/chat-screen"


const Stack = createNativeStackNavigator<HomeStackParamlist>()

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={ChatScreen} options={{ headerShown: false, }} />

        </Stack.Navigator>
    )
}

export default HomeStackNavigator