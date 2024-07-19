import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationType } from '../../navigation/types';
import SafeAreaWrapper from '../../src/shared/safe-area-wrapper';
import { Box, Text } from '../../utils/theme';
import Button from '../../src/shared/button';

const WelcomeScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"Welcome">>();
    const navigateToSignUpScreen = () => {
        navigation.navigate("SignUp");
    };

    return (
        <SafeAreaWrapper>
            <Box flex={1} justifyContent='center'>
                <Text textAlign='center' variant="textXl" fontWeight="700">
                    daha aktif olmak ister misin.
                </Text>
                <Box my='3.5' mx='10'>
                    <Button
                        label='Yolculugunu baslat'
                        onPress={navigateToSignUpScreen}
                    />
                </Box>
                <Text textAlign='center'>
                    26.343 kişi bugun kayıt yaptırdı
                </Text>
            </Box>
        </SafeAreaWrapper>
    );
};

export default WelcomeScreen;