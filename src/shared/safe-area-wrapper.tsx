
import React, { Children, ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'


type SafeAreaWraperProps = {
    children: ReactNode
}

const SafeAreaWraper = ({ children }: SafeAreaWraperProps) => {
    return (
        <SafeAreaView
            style={tw`flex-1 justify-center items-center bg-blue-500`}
        >
            {children}
        </SafeAreaView>
    )
}

export default SafeAreaWraper