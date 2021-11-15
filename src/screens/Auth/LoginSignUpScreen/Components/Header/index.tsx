import React, {useEffect} from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Header = () =>{
    return(
        <View style={styles.container}>
            <Image
                style={styles.headerLogo}
                source={require('../../../../../assets/images/logo_header.png')}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        backgroundColor:'white',
        width:'100%',
        height:90,
        borderBottomLeftRadius:50,
        borderBottomRightRadius:50,
        shadowColor: '#398FCE',
        borderColor:'#FFFFFF',
        borderBottomColor: '#398FCE',
        borderWidth:3,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 25,
    },
    headerLogo:{
        marginTop:-20,
    },
});

export default Header;