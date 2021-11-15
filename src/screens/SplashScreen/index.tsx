import React, {useEffect} from 'react';
import { Image, StyleSheet, View } from 'react-native';

const SplashScreen : React.FunctionComponent = ({navigation} : any) =>{

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('LoginSignUp');
          }, 3000);
          //return () => props.navigation.replace('LoginSignUp');
    }, [navigation])

    return(
        <View style={styles.container}>
            <Image
                style={{ width: 200, height: 200 }}
                source={require('../../assets/images/gxfo_logo.png')}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default SplashScreen;