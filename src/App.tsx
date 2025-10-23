import messaging from '@react-native-firebase/messaging';
import {use, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import WithAuth from './Context/UserContext';
import {store} from './infrastructure/redux/store';
import RootNavigator from './navigation/RootNavigator';
import initializeNotifications from './services/notifications/initializeNotifications';


if (__DEV__) {
  require('./../ReactotronConfig').default;

}

export default function App() {

  useEffect(() => {
    initializeNotifications();
  }, []);


  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <StatusBar translucent={false} />
        <WithAuth>
          <Provider store={store}>
            <RootNavigator />
          </Provider>
        </WithAuth>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
