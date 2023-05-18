import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen'; //import SplashScreen
import Navigation from './src/components/Navigation';

const App = () => {
  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);
  return <Navigation />;
};

export default App;
