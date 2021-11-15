import React, { useContext, useEffect, useState } from 'react';
import { Image, Keyboard, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import * as Animatable from 'react-native-animatable';

import Header from './Components/Header'
import Login from './Login'
import Signup from './SignUp'
import { GuestContext } from '../../../contexts/GuestContext';



const FirstRoute = () => 
  (
    <Login />
  );
  
  const SecondRoute = () => (
    <Signup />
  );
  
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (props : any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#4E67B0' }}
      style={{ backgroundColor: 'white',
      borderColor:'white',
      borderTopColor: '#398FCE',
      marginBottom:20,}}
      activeColor='#4E67B0'
      inactiveColor='#00000080'
    
    />
  );

const LoginSignUpScreen : React.FunctionComponent = (props : any) =>{
    const {isHeaderBannerAuthVisible} = useContext(GuestContext);
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'first', title: 'Masuk' },
        {key: 'second', title: 'Daftar' },
    ]);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setKeyboardVisible(true); // or some other action
        }
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setKeyboardVisible(false); // or some other action
        }
      );
  
      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }, []);

    return(
        <View style={styles.container}>
            {!isKeyboardVisible && isHeaderBannerAuthVisible ? (
              <Animatable.View animation={'slideInDown'}>
                <Header data-testID='header-loginSignup'/>
                <Image style={{ width: '100%', marginTop: -60 }} source={require('../../../assets/images/auth_banner_1.png')} />
              </Animatable.View>
            ):null}
            <TabView
              renderTabBar={renderTabBar}
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
            />
            
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    }
});

export default LoginSignUpScreen