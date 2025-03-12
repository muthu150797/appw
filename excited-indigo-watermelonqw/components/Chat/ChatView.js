import React, { useState, useEffect ,useLayoutEffect} from "react";
import { 
  View, Text, Image,TextInput, TouchableOpacity, Platform, 
  TouchableWithoutFeedback, Keyboard, FlatList, 
  KeyboardAvoidingView, StyleSheet 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { io } from "socket.io-client";
import AsyncStorage from '@react-native-async-storage/async-storage';

const socket = io("https://newapi-5y5y.onrender.com");

const ChatScreen = ({ navigation,route }) => {
    const { userd } = route.params; // ✅ Getting user object from navigation
        console.log("User Loaded:sfsaffdfsdfsadfsdfsd", userd); // Debug
        navigation.setOptions({ title: userd.name }); // Set title

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [user, setUser] = useState(route.params?.user || null); // ✅ Use optional chaining
    console.log("userDataus erDatauserData",user)
  // Fetch user data from AsyncStorage
  const getUserData = async () => {
    try {
      
      const storedUser = await AsyncStorage.getItem('userToken');
      if (storedUser) {
        const parsedUser = await JSON.parse(storedUser);
        console.log("User Loaded:", parsedUser); // Debug
        //await setUser(parsedUser);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "", // ❌ Hide default title
      headerStyle: { backgroundColor: "#075E54", height: 120 },
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Image
            source={{ uri: userd.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST8szaUTA9sKaa3eOionRtqCb84hPF7J1up4ZmlMSuDQRWZL_Z0sdG0F6X0a0dAZ0_ZpY&s" }}
            style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 10 }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>{userd.name}</Text>
            <Text style={{ color: "#ddd", fontSize: 12 ,}}>last seen today at 13:25</Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", marginRight: 10 }}>
          <Ionicons name="videocam" size={24} color="white" style={{ marginHorizontal: 10 }} />
          <Ionicons name="call" size={24} color="white" />
        </View>
      ),
    });
    getUserData();
    socket.on("message", (msg) => {
      console.log("Message Received:", msg); // Debug
      setMessageList((prevMessages) => 
        [...prevMessages, msg].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      );
    });

    return () => {
      socket.off("message");
    };
  },[]);

  // Send message
  const sendMessage = () => {
    if (!message.trim()) return;

    if (!user) {
      console.error("Error: User is null!"); // Debug
      return;
    }

    const msg = { 
      id: user._id, 
      text: message, 
      sender: user._id,
      timestamp: new Date().toISOString() // Ensure valid timestamp
    };

    console.log("Sending Message:", msg); // Debug
    socket.emit("message", msg);
    setMessage(""); // Clear input after sending
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} 
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          {/* Messages List */}
          <FlatList
            data={[...messageList].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={[styles.messageBubble, item.sender === user?._id ? styles.userBubble : styles.botBubble]}>
                <Text style={styles.messageText}>{item.text}</Text>
                <Text style={styles.timestamp}>
                  {new Date(item.timestamp).toLocaleTimeString()}
                </Text>
              </View>
            )}
            inverted
            keyboardShouldPersistTaps="handled"
          />

          {/* Message Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Ionicons name="send" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

// Styles
const styles = StyleSheet.create({
  messageBubble: { padding: 10, borderRadius: 8, marginVertical: 4, maxWidth: "75%" },
  userBubble: { backgroundColor: "#0084ff", alignSelf: "flex-end" },
  botBubble: { backgroundColor: "white", alignSelf: "flex-start" },
  messageText: { color: "black", fontSize: 16 },
  timestamp: { fontSize: 12, color: "gray", marginTop: 4, alignSelf: "flex-end" },
  inputContainer: { flexDirection: "row", alignItems: "center", padding: 10, backgroundColor: "white" },
  input: { flex: 1, padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 25 },
  sendButton: { marginLeft: 10, backgroundColor: "#0084ff", padding: 10, borderRadius: 25 },
});

export default ChatScreen;
