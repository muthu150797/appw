import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen'; // Create a simple Home screen
import Dashboard from './components/Dashboard/Dashboard';
 import ChatTabs from "./components/Chat/ChatTabs"
  import ChatScreen from "./components/Chat/ChatView"

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="dashboard" component={Dashboard} />
        <Stack.Screen name="chat" component={ChatTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Chatwithuser" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
