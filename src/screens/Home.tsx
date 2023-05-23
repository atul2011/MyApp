import React, {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useIsFocused} from '@react-navigation/native';
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  // other screen definitions
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface HomeProps {
  navigation: HomeScreenNavigationProp;
}

const Home = ({navigation}: HomeProps) => {
  const [userToken, setUserToken] = useState('');
  const [user, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true); // Added loading state
  const isFocused = useIsFocused(); // Hook to check if the component is focused

  // Fetch token and set state
  useEffect(() => {
    restoreUser(); // Call restoreUser when the component mounts
  }, [isFocused]); // Listen for changes in the isFocused state

  const restoreUser = async () => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo) {
        let jUserInfo = JSON.parse(userInfo);
        setUserInfo(jUserInfo.data.user);
        setUserToken(jUserInfo.data.token);
        // Perform other logic with the user token
      } else {
        // Handle the case when the userInfo is null
      }
    } catch (error) {
      // Handle the error
    } finally {
      setLoading(false); // Update the loading state
    }
  };

  useEffect(() => {
    if (userToken !== '') {
      // Perform other logic with the user token
      console.log(userToken);
    }
  }, [userToken]);

  const logout = () => {
    console.log('here');
    const payload = {
      token: userToken,
    };
    fetch('http://10.0.2.2:5000/api/auth/logout', {
      method: 'POST',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(res => {
        console.log('res', res);
        AsyncStorage.removeItem('userInfo');
        setUserToken('');
        setUserInfo({});
        console.log(userToken);
        // navigation.navigate('Home');
      })
      .catch(e => {
        console.log(`logout error ${e}`);
      });
  };

  return (
    <View>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={styles.background}>
        <View>
          <Image
            source={require('../../assets/mylogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.text}>We expect everything.</Text>
          {loading ? ( // Display loading indicator while fetching userToken
            <ActivityIndicator color="red" size="large" />
          ) : userToken === '' ? (
            <>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.signup}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.login}>Log In</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.container}>
                <Text style={styles.welcome}>Welcome {user.name}</Text>
                <Button title="Logout" color="red" onPress={logout} />
              </View>
            </>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
    marginTop: '10%',
    color: 'white',
  },
  background: {
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 280,
    marginLeft: '15%',
    marginTop: '10%',
  },
  text: {
    color: 'white',
    marginTop: '-10%',
    marginLeft: '30%',
  },
  signup: {
    backgroundColor: 'white',
    color: '#237091',
    width: '75%',
    borderRadius: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: '11%',
    padding: '2%',
    fontSize: 27,
    marginTop: '10%',
  },
  login: {
    backgroundColor: '#237091',
    color: 'white',
    width: '75%',
    borderRadius: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: '11%',
    padding: '2%',
    fontSize: 27,
    marginTop: '10%',
  },
});

export default Home;
