import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const tron = Reactotron
  .setAsyncStorageHandler(AsyncStorage)
  .configure({ name: 'Cartly' })
  .useReactNative()
  .use(reactotronRedux())
  .connect();

console.tron = Reactotron;
Reactotron.clear();

export default tron;
