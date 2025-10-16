import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../infrastructure/redux/store';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';

const RootNavigator = () => {
  let authenticated = true;
  //const auth = useAuth();
  //const Log = useSelector((state: RootState) => state.user.isLoggedIn);
  //console.log('User from Redux:', Log);
  if (authenticated) {
    return (
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
  }
};

export default RootNavigator;
