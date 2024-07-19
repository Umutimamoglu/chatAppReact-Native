import { ThemeProvider } from '@shopify/restyle';
import theme from './utils/theme';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { SWRConfig } from 'swr';
import { AppState } from 'react-native';
import Navigation from './navigation';
const App = () => {
  return (
    // Tema sağlayıcı bileşeni, tüm alt bileşenlerde tema kullanılabilir hale getirir
    <ThemeProvider theme={theme}>
      {/* SafeAreaProvider, cihazın güvenli alanlarını yönetir */}
      <SafeAreaProvider>
        {/* SWRConfig, SWR kütüphanesi için global yapılandırmayı sağlar */}
        <SWRConfig
          value={{
            // Veri sağlayıcıyı bir Map nesnesi olarak ayarlayın
            provider: () => new Map(),
            // Verinin görünürlüğünü her zaman doğru olarak ayarlayın
            isVisible: () => true,
            // Uygulamanın odaklandığında veri yenilemesini sağlayın
            initFocus: (callback) => {
              let appState = AppState.currentState;

              // Uygulama durumu değiştiğinde çalışacak işlev
              const onAppStateChange = (nextAppState: any) => {
                // Uygulama arka plandan aktif duruma geçtiğinde geri çağırmayı tetikleyin
                if (appState.match(/inactive|background/) && nextAppState === 'active') {
                  callback();
                }
                appState = nextAppState;
              };

              // Uygulama durumu değişikliklerini dinleyen bir abonelik oluşturun
              const subscription = AppState.addEventListener('change', onAppStateChange);

              // Temizleme işlevi: Aboneliği kaldırır
              return () => {
                subscription.remove();
              };
            },
          }}
        >
          {/* Uygulamanın navigasyon bileşeni */}
          <Navigation />
        </SWRConfig>
        {/* Durum çubuğunu saydam olarak ayarlayın */}
        <StatusBar translucent />
      </SafeAreaProvider>
    </ThemeProvider>
  );

};

export default App;