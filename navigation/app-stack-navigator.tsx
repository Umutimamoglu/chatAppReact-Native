import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootBottomTabParamList } from "./types";


import { color, useTheme } from "@shopify/restyle";
import Icons from "../src/shared/icons";
import HomeStackNavigator from "./home-stack-navigator";



const Tab = createBottomTabNavigator<RootBottomTabParamList>()

const BottomTabNavigator = () => {
    const theme = useTheme()
    return (<Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: "black",
            tabBarInactiveTintColor: theme.colors.gray550,
            tabBarHideOnKeyboard: true,
        }}
    >
        <Tab.Screen name="HomeStack" component={HomeStackNavigator}
            options={() => ({
                title: "Home",
                tabBarIcon: ({ color }) => <Icons name="home" color={color}

                />,
                headerShown: false,
            })}
        />


    </Tab.Navigator>
    )
}

export default BottomTabNavigator