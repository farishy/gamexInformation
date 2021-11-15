import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const CustomButtonCircle = (props : any) => {
    return(
        <View style={props.style} testID={props.testID}>
            <TouchableOpacity style={styles.primary}>
                <Image source={props.source} style={[styles.icon, 
                    props.size !== undefined || null ? {width:props.size, height:props.size}:null]}/>
            </TouchableOpacity>
        </View>
        
    )
}

const styles = StyleSheet.create({
    primary:{
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        borderRadius:25,
        borderColor:'#398FCEE6'
    },
    icon:{
        width:25,
        height:25,
        
    },

});

export default CustomButtonCircle;