


import React from 'react'
import { AuthScreenNavigationType } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { registerUser } from '../../service/api';
import SafeAreaWraper from '../../src/shared/safe-area-wrapper';
import { Box, Text } from '../../utils/theme';
import Input from '../../src/shared/input';
import { Pressable } from 'react-native';
import Button from '../../src/shared/button';



interface IUser {
    name: string;
    email: string;
    password: string;
}


const SignUpScreen = () => {

    const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>()
    const navigateToSignInScreen = () => {
        navigation.navigate("SignIn")
    }

    const { control, handleSubmit, formState: { errors } } = useForm<IUser>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });
    const onSubmit = async (data: IUser) => {
        try {
            const { email, name, password } = data;
            console.log('Registering user:', { email, name, password });

            // Kullanıcı kaydı API çağrısı
            await registerUser({
                email,
                name,
                password
            });

            // Kayıt başarılı olduğunda giriş ekranına yönlendirme
            navigateToSignInScreen();
        } catch (error: unknown) {
            // Hata yönetimi
            if (axios.isAxiosError(error)) {
                console.error('Axios error in onSubmit:', error.response?.data || error.message);
            } else {
                console.error('Unexpected error in onSubmit:', error);
            }
        }
    }

    return (
        <SafeAreaWraper>
            <Box flex={1} px="5.5" mt={"13"}>
                {/* Başlık ve alt başlık */}
                <Text variant="textXl" fontWeight="700">
                    yapılacaklar listesine hoş geldin
                </Text>
                <Text variant="textXl" fontWeight="700" mb='6'>
                    yolculuğun buradan başlıyor
                </Text>

                {/* Ad alanı için kontrolör */}
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Name"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    rules={{ required: 'Name is required' }} // Zorunlu alan kuralı
                />
                <Box mb='6' />

                {/* Email alanı için kontrolör */}
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Email"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    rules={{ required: 'Email is required' }} // Zorunlu alan kuralı
                />
                <Box mb='6' />

                {/* Şifre alanı için kontrolör */}
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Password"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                        />
                    )}
                    rules={{ required: 'Password is required' }} // Zorunlu alan kuralı
                />
                <Box mt='5.5' />

                {/* Zaten hesabınız var mı? yazısı ve giriş ekranına yönlendirme */}
                <Pressable onPress={navigateToSignInScreen}>
                    <Text textAlign='right'>
                        Zaten bir hesabınız var mı?
                    </Text>
                </Pressable>
                <Box mb='5.5' />

                {/* Kayıt Ol butonu */}
                <Button label='Kayıt Ol' onPress={handleSubmit(onSubmit)} uppercase />
            </Box>
        </SafeAreaWraper>
    )
}

export default SignUpScreen