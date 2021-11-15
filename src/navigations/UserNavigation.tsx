import React, { FC } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
    Home,
    LoginSignUp,
    SplashScreen
} from '../screens';

const {Navigator, Screen} = createStackNavigator();

const UserNavigation : FC  = () => {
    return(
        <Navigator screenOptions={{headerShown:false}}>
            <Screen name='SplashScreen' component={SplashScreen}/>
            <Screen name='LoginSignUp' component={LoginSignUp}/>
            <Screen name='Home' component={Home}/>
        </Navigator>
    )
};

export default UserNavigation;