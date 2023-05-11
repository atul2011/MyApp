import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen'; //import SplashScreen
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import {APP_NAME} from '@env';
const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: APP_NAME,
            headerStyle: {
              backgroundColor: '#237091',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
