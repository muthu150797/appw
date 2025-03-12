import React, { useEffect, useState } from 'react';
import { StyleSheet, Pressable, View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SecondPage = ({ navigation }) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem('userToken');
      setToken(storedToken || 'No token found');
    };
    getToken();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.replace('login');
  };

  return (
    <View style={styles.viewText}>
      <Text>Welcome to the Second Page!</Text>
      <Text>Your token: {token}</Text>
      <Pressable
        onPress={handleLogout}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? 'darkblue' : '#007BFF' },
        ]}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  viewText: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default SecondPage;
