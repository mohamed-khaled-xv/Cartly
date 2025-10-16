import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAuth} from '../../Context/UserContext';
import {AuthStackNavigationProp} from '../../navigation/types/authTypes';
import {Colors} from '../../styles/theme';
import {FontFamily} from '../../styles/typography';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<AuthStackNavigationProp<'SignupScreen'>>();
  const auth = useAuth();
  const handleGuest = () => {
    auth?.changeUserInfo({
      id: Date.now(),
      token: 'guest-token',
      isGuest: true,
      fullName: 'Guest User',
      email: '',
      isLoggedIn: true,
    });
  };

  const submitForm = () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    auth?.changeUserInfo({
      id: Date.now(),
      token: 'user-token-' + Date.now(), // Generate a user token
      isGuest: false,
      fullName: name,
      email,
      isLoggedIn: true,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.formContainer}>
        <Text>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#999999"
          value={name}
          onChangeText={setName}
        />
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999999"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#999999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.secondaryButton} onPress={submitForm}>
          <Text style={styles.secondaryButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.secondaryButtonText}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={handleGuest}>
        <Text style={styles.secondaryButtonText}>Continue as a guest</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: 40,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.text,
  },

  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: '#6CC51D',
    minWidth: 250,
  },
  secondaryButtonText: {
    color: '#6CC51D',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
});

export default Signup;
