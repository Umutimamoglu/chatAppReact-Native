import { CompositeNavigationProp, NavigatorScreenParams } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export type AuthStackParamList = {
    Welcome: undefined
    SignIn: undefined
    SignUp: undefined
}

export type HomeStackParamlist = {
    Home: undefined

}


export type RootBottomTabParamList = {
    HomeStack: NavigatorScreenParams<HomeStackParamlist>

}


export type AppStackParamList = {
    Root: NavigatorScreenParams<RootBottomTabParamList>
    Settings: undefined
}

export type AuthScreenNavigationType<
    RouteName extends keyof AuthStackParamList
> = CompositeNavigationProp<
    NativeStackNavigationProp<AuthStackParamList, RouteName>,
    NativeStackNavigationProp<AppStackParamList, "Root">
>
