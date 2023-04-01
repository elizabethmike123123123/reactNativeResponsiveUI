import AnimatedSplash from 'react-native-animated-splash-screen';
import {useEffect, useState} from 'react';
import {AuthProvider} from './src/context/AuthContext';
import Logo from './src/assets/logo/logo.png';
import {Image, View} from 'react-native';
import {COLORS, screenSize} from './src/global/Constants';
import MainStack from './src/navigation/MainStack';
import {ContextProvider} from './src/context/UseContext';
import {NativeBaseProvider, Text} from 'native-base';
import {
  getFcmToken,
  notificationListener,
  requestUserPermission,
} from './src/utils/notificationServices';

import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import NoInternet from './src/components/NoInternet';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  const [deviceToken, setDeviceToken] = useState(null);

  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    requestUserPermission();
    notificationListener();
    getFcmToken();
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, []);

  useEffect(() => {
    setInterval(() => {
      NetInfo.addEventListener(state => {
        setIsConnected(state.isConnected);
      });
    }, 1000);
  }, []);

  return (
    <AuthProvider>
      <ContextProvider>
        <NativeBaseProvider>
          <AnimatedSplash
            isLoaded={isLoaded}
            logoWidth={screenSize.width}
            logoHeight={screenSize.height}
            customComponent={
              <View
                style={{
                  minWidth: screenSize.width,
                  minHeight: screenSize.height,
                  backgroundColor: 'white',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image source={Logo} style={{maxHeight: 300, maxWidth: 300}} />
              </View>
            }>
            {isConnected ? <MainStack /> : <NoInternet />}
          </AnimatedSplash>
        </NativeBaseProvider>
      </ContextProvider>
    </AuthProvider>
  );
}
