import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import HyperLink from '../../components/HyperLink';

const Home : React.FunctionComponent = (props:any) =>{
    return(
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <CustomButton label='Logout' color='black' onPress={()=>props.navigation.navigate('LoginSignUp')}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
});

export default Home;