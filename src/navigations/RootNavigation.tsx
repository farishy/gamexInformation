import React, {FC, useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserNavigation from './UserNavigation';
import GuestNavigation from './GuestNavigation';
import { GuestProvider } from '../contexts/GuestContext';

const RootNavigation : FC = () => {

    const [userAuth, setUserAuth] = useState<Boolean>(false);

    const getUser = async () => {
        const user = await AsyncStorage.getItem('user');
        if(user){
            setUserAuth(true);
        }
    }
    useEffect(() => {
        getUser()
    }, [])

    return(
        <GuestProvider>    
            <NavigationContainer>
                {userAuth !== false ? <UserNavigation /> : <GuestNavigation />}
                {/* <GuestNavigation /> */}
            </NavigationContainer>
        </GuestProvider>
    )
}

export default RootNavigation;