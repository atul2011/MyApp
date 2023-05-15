import React, {useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  Alert,
} from 'react-native';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  // other screen definitions
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home',
  'Login'
>;

interface HomeProps {
  navigation: HomeScreenNavigationProp;
}

const Register = ({navigation}: HomeProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [modalBTN, setModalBTN] = useState('');
  const [modalText, setModalText] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  // const onLoggedIn = (token: any) => {
  //   fetch(`${process.env.REACT_APP_API_URL}/private`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then(async res => {
  //       try {
  //         const jsonRes = await res.json();
  //         if (res.status === 200) {
  //           setMessage(jsonRes.message);
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  const onSubmitHandler = navigation => {
    const payload = {
      email,
      name,
      password,
    };
    // fetch(`${process.env.REACT_APP_API_URL}auth/register`, {
    fetch('http://10.0.2.2:5000/api/auth/register', {
      method: 'POST',
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(async res => {
        try {
          const jsonRes = await res.json();
          console.log(jsonRes);
          if (res.status !== 200) {
            setIsError(true);
            setMessage(jsonRes.message);
            setModalText(jsonRes.message);
            setModalBTN('Close');
            setModalVisible(true);
          } else {
            // onLoggedIn(jsonRes.token);
            setIsError(false);
            setModalText('Successfully registered');
            setModalBTN('Go to Login');
            setModalVisible(true);
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getMessage = () => {
    const status = isError ? 'Error: ' : 'Success: ';
    // return status + message;
    return status;
  };

  const getAction = () => {
    if (getMessage() === 'Error: ') {
      setModalVisible(false);
    } else if (getMessage() === 'Success: ') {
      navigation.navigate('Login');
    }
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalText}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>
                //setModalVisible(!modalVisible)
                getAction()
              }>
              <Text style={styles.textStyle}>{modalBTN}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={styles.background}>
        <View>
          <Image
            source={require('../../assets/mylogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <TextInput
            style={styles.input}
            value={name}
            placeholder={'Name'}
            onChangeText={text => setName(text)}
            autoCapitalize={'none'}
          />
          <TextInput
            style={styles.input}
            value={email}
            placeholder={'Email'}
            onChangeText={text => setEmail(text)}
            autoCapitalize={'none'}
          />
          <TextInput
            style={styles.input}
            value={password}
            placeholder={'Password'}
            secureTextEntry
            onChangeText={text => setPassword(text)}
          />
          <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>
            {message ? getMessage() : null}
          </Text>
          <TouchableOpacity>
            <Text style={styles.signup} onPress={onSubmitHandler}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 280,
    marginLeft: '15%',
    marginTop: '10%',
  },
  background: {
    width: '100%',
    height: '100%',
  },
  input: {
    marginTop: '10%',
    marginLeft: '11%',
    width: '75%',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 25,
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
  message: {
    fontSize: 16,
    marginVertical: '5%',
  },
  // modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Register;
