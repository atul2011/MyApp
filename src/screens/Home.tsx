import React, {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
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
  const [userToken, setUserToken] = useState({});

  // Fetch token and set state
  useEffect(() => {
    restoreUser(); // Call restoreUser when the component mounts
  }, []);
  const restoreUser = async () => {
    const userInfo = await AsyncStorage.getItem('userInfo');
    if (userInfo) {
      let jUserInfo = JSON.parse(userInfo);
      setUserToken(jUserInfo.data.token);
      console.log(userToken);
      // Perform other logic with the user token
    } else {
      // Handle the case when the userInfo is null
    }
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
          {userToken == null ? (
            <>
              <TouchableOpacity>
                <Text
                  style={styles.signup}
                  onPress={() => navigation.navigate('Register')}>
                  Sign Up
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={styles.login}
                  onPress={() => navigation.navigate('Login')}>
                  Log In
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <></>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
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
