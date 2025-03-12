// LoginScreen.js
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Keyboard,
  StyleSheet,
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [responseColor, setResponseColor] = useState('black');
  const navigation = useNavigation(); // ✅ Now it's inside NavigationContainer

  const handleLogin = async () => {
    if (!email) {
      setMessage('Enter the username');
      setResponseColor('red');
      return;
    }
    if (!password) {
      setMessage('Enter the password');
      setResponseColor('red');
      return;
    }
    console.log('info', email);
    Keyboard.dismiss();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(
        'https://newapi-5y5y.onrender.com/api/users/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: email,
            password: password,
          }),
        }
      );

      const statusCode = await response.status;
      const data = await response.json();

      if (statusCode === 200) {
        console.log('dataddd', JSON.stringify(data.users));
        await AsyncStorage.setItem('userToken',JSON.stringify(data.users));
        await AsyncStorage.setItem('token',data.token);
        navigation.replace('chat');
        //navigation.navigate('Home'); // ✅ Navigate after login
      } else {
        console.log('cantlogin');
        setResponseColor('red');
        setMessage(data.message || 'Login failed!');
      }
    } catch (error) {
      console.log('error', error);
      setMessage('Error logging in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {message && (
        <Text style={[styles.responseText, { color: responseColor }]}>
          {message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '90%',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    
    color: '#000',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    width: '90%',
  },
  responseText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  link: {
    color: '#007BFF',
    fontSize: 14,
  },
});
