import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import WithAuth from './Context/UserContext';
import {store} from './infrastructure/redux/store';
import RootNavigator from './navigation/RootNavigator';
import FCMProvider from './services/notifications/FCMProvider';

if (__DEV__) {
  require('./../ReactotronConfig').default;
}

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <StatusBar translucent={false} />
        <NavigationContainer>
          <WithAuth>
            <Provider store={store}>
              <FCMProvider>
                <RootNavigator />
              </FCMProvider>
            </Provider>
          </WithAuth>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
