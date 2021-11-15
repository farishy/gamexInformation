import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const HyperLink = (props : any) => {
    return(
        <View style={props.style} testID={props.testID}>
            <TouchableOpacity style={styles.primary}
                onPress={props.onPress}
            >
                <Text style={{color:props.color, textAlign:props.align, fontWeight:props.fontWeight}}>{props.label}</Text>
            </TouchableOpacity>
        </View>
        
    )
}

const styles = StyleSheet.create({
    primary:{
        flex:1,
        paddingHorizontal:10,
    },

});

export default HyperLink;