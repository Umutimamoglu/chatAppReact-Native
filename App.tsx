import React, { useEffect } from 'react';
import { ThemeProvider } from '@shopify/restyle';
import theme from './utils/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { SWRConfig } from 'swr';
import { AppState } from 'react-native';
import Navigation from './navigation';
import { ChatContextProvider } from './src/context/chatContext';
import useUserGlobalStore from './store/useUserGlobalStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const { user, updateUser } = useUserGlobalStore();

  useEffect(() => {
    // Kullanıcı bilgilerini temizle
    const clearUserInfo = async () => {
      await AsyncStorage.removeItem("chatapp-store"); // AsyncStorage'deki kullanıcı bilgisini sil
      updateUser(null); // Zustand store'undaki kullanıcı bilgisini güncelle
    };

    clearUserInfo();
  }, []);

  // Kullanıcı bilgilerine erişim
  console.log("Current user ID: ", user?._id);

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <ChatContextProvider user={user}>
          <SWRConfig value={{
            provider: () => new Map(),
            isVisible: () => true,
            initFocus: (callback) => {
              const onAppStateChange = (nextAppState) => {
                const appState = AppState.currentState;
                if (appState.match(/inactive|background/) && nextAppState === 'active') {
                  callback();
                }
              };
              const subscription = AppState.addEventListener('change', onAppStateChange);
              return () => subscription.remove();
            },
          }}>
            <Navigation />
          </SWRConfig>
          <StatusBar translucent />
        </ChatContextProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;