import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const CustomButton = (props : any) => {
    return(
        <View style={props.style}>
            <TouchableOpacity testID={props.testID} disabled={props.disabled} onPress={props.onPress}>
                <LinearGradient style={styles.primary} colors={props.disabled ?['#231F2026','#231F2026'] : ['#398FCEE6','#4E67B0E6']}
                    start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                    locations={[0,1.0]}
                >
                    <Text style={styles.label}>{props.label}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
        
    )
}

const styles = StyleSheet.create({
    primary:{
        width: '100%',
        height:50,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
    },
    label:{
        fontSize:16,
        fontWeight:'bold',
        textAlign:'center',
        color:'white'
        
    },

});

export default CustomButton;