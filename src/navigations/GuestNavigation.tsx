import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
    LoginSignUp,
    SplashScreen,
    Home,
    Login,
    SignUp
} from '../screens';

const {Navigator, Screen} = createStackNavigator();

const GuestNavigation : React.FunctionComponent = () => {
    return(
        <Navigator screenOptions={{headerShown:false}}>
            <Screen name='SplashScreen' component={SplashScreen}/>
            <Screen name='LoginSignUp' component={LoginSignUp}/>
            <Screen name='Home' component={Home}/>
        </Navigator>
    )
};

export default GuestNavigation;