
import { View, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationType } from '../../navigation/types';
import useUserGlobalStore from '../../store/useUserGlobalStore';
import { Controller, useForm } from 'react-hook-form';
import { IUser } from '../../types';
import SafeAreaWraper from '../../src/shared/safe-area-wrapper';
import Button from '../../src/shared/button';
import { Box, Text } from '../../utils/theme';
import Input from '../../src/shared/input';
import { loginUser } from '../../service/api';


const SignInScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"SignIn">>();
    const navigateToSignUpScreen = () => {
        navigation.navigate("SignUp");
    };
    const { updateUser } = useUserGlobalStore();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Omit<IUser, "name">>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: Omit<IUser, "name">) => {
        try {
            const { email, password } = data;
            console.log("Form verileri:", data);
            const _user = await loginUser({
                email: email.toLowerCase(),
                password: password,
            });
            console.log("Giriş yapan kullanıcı verisi:", _user); // Dönen kullanıcı verisini kontrol edin

            // Eğer _user objesi doğru bir şekilde döndüyse ve _id özelliği içeriyorsa güncelleme yap
            if (_user && _user._id) {
                updateUser(_user); // Burada _user objesini direkt olarak güncelleyiciye gönderiyoruz
            }
        } catch (error) {
            console.log("Error logging in user:", error);
        }
    };

    return (
        <SafeAreaWraper>
            <Box flex={1} px="5.5" justifyContent='center'>
                <Text variant="textXl" fontWeight="700">
                    tekrar hos geldiniz
                </Text>

                <Controller
                    control={control}
                    name="email"
                    rules={{ required: { value: true, message: 'Email is required' } }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <Input
                            label="Email"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={error}
                        />
                    )}
                />
                <Box mb='6' />

                <Controller
                    control={control}
                    name="password"
                    rules={{ required: { value: true, message: 'Password is required' } }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <Input
                            label="Password"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={error}
                        />
                    )}
                />
                <Box mt='5.5' />

                <Pressable onPress={navigateToSignUpScreen}>
                    <Text textAlign='right'>
                        Kayıt?
                    </Text>
                </Pressable>
                <Box mb='5.5' />

                <Button label='Giriş Yap' onPress={handleSubmit(onSubmit)} uppercase />
            </Box>
        </SafeAreaWraper>
    );
};

export default SignInScreen;