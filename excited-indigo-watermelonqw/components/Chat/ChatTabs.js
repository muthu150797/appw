import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';
import ChatScreen from './ChatView';
import { CallsScreen } from './ChatView';
const Tab = createBottomTabNavigator();
import { useNavigation } from '@react-navigation/native';
//import { ref, off, get, push, set, onValue, serverTimestamp, onChildAdded } from "firebase/database";
//import { firebase, database } from '../Services/FireBase'; // Import firebase and database correctly
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
const chatData = [
  { id: '1', name: 'WABetaInfo', message: 'You: WABetaInfo', time: '9:54 AM' },
  { id: '2', name: 'WBI', message: 'New message', time: 'Yesterday' },
  { id: '3', name: 'WBI GROUP', message: 'WBI: You', time: '7/28/23' },
];
const ChatsScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('token');
        if (storedUser) {
          //const parsedUser = await JSON.parse(storedUser);
          console.log('storedUser token', storedUser); // Debug
        }
        const response = await fetch(
          'https://newapi-5y5y.onrender.com/api/users/getAllUsers',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + storedUser,
            },
          }
        );

        const statusCode = await response.status;
        const data = await response.json();
        if (statusCode === 200) {
          console.log('data--', data);
          setUsers((prevUsers) => {
            console.log('Updated users:', data); // Logs the correct updated value
            return data; // Update state with new data
          });

          //await AsyncStorage.setItem('userToken',JSON.stringify(data.users));
          //navigation.navigate('Home'); // ✅ Navigate after login
        } else {
          console.log('cant get data');
          //setResponseColor('red');
          //setMessage(data.message || 'fetch data failed!');
        }
      } catch (error) {
        console.log('error', error);
        // setMessage('Error logging in.');
      } finally {
        //setLoading(false);
      }
    };
    getAllUsers();
  }, []);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => {
              navigation.navigate('Chatwithuser', { userd: item });
            }}>
            <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST8szaUTA9sKaa3eOionRtqCb84hPF7J1up4ZmlMSuDQRWZL_Z0sdG0F6X0a0dAZ0_ZpY&s' }}
              style={styles.avatar}
            />
            <View style={styles.chatInfo}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.chatMessage}>{item.name}</Text>
            </View>
            <Text style={styles.chatTime}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Floating Action Button (New Chat) */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="chatbubble-ellipses" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};
const ChatTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Chats') iconName = 'chatbubble-outline';
          else if (route.name === 'Status') iconName = 'ellipse-outline';
          else if (route.name === 'Calls') iconName = 'call-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Chats" component={ChatsScreen} />
      <Tab.Screen name="Calls" component={CallsScreen} />
    </Tab.Navigator>
  );
};
const StatusScreen = () => (
  <View style={styles.centered}>
    <Text>Status Screen</Text>
  </View>
);

export default ChatTabs;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 10 },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  chatInfo: { flex: 1 },
  chatName: { fontSize: 16, fontWeight: 'bold' },
  chatMessage: { fontSize: 14, color: '#666' },
  chatTime: { fontSize: 12, color: '#888' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#25D366',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
