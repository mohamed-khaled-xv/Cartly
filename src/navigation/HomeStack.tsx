import {createNativeStackNavigator} from '@react-navigation/native-stack';
// Import screens
import Home from '../screens/Home/Home';
import ProductDetail from '../screens/ProductDetail/ProductDetail';
import Profile from '../screens/Profile/Profile';
import {HomeStackParamList} from './types';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

// Home Stack Navigator

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#333333',
        },
        headerTintColor: '#6CC51D',
      }}>
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="ProfileScreen"
        component={Profile}
        options={{title: 'My Profile'}}
      />
      <HomeStack.Screen
        name="ProductDetailScreen"
        component={ProductDetail}
        options={{title: 'Product Details'}}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
