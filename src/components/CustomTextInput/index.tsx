import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Animated} from 'react-native';
import Icon from "react-native-dynamic-vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GuestContext } from '../../contexts/GuestContext';

const CustomTextInput = (props : any) => {
    const {setHeaderBannerAuthVisible} = useContext(GuestContext);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(props.secureTextEntry);
    const [isFocused, setFocused] = useState<boolean>(false);
    const [isErrorMessageValid, setErrorMessageValid] = useState<boolean>(false);

    const handleFocus = () => {
        setFocused(true);
        setHeaderBannerAuthVisible(false);
    }
    const handleBlur = () => {
        setFocused(false);
        setHeaderBannerAuthVisible(true);
    }

    const animatedIsFocused = useRef(new Animated.Value(props.value === undefined || null || '' ? 0 : 1)).current;

    useEffect(() => {
        Animated.timing(animatedIsFocused,{
            toValue: (isFocused || props.value !== '') ? 1 : 0,
            duration:200,
            useNativeDriver: false,
       }).start();
    }, [isFocused])

    useEffect(() => {
        if(props.errorMessage === undefined || props.errorMessage === null || props.errorMessage === ''){
            setErrorMessageValid(false);
        }else{
            setErrorMessageValid(true);
        }
    }, [props.errorMessage])

    return(
        <View style={[props.style]}>
            <Animated.Text style={{
                elevation:0.1,
                fontSize: animatedIsFocused.interpolate({
                    inputRange: [0,1],
                    outputRange: [16, 14]
                }),
                paddingHorizontal: animatedIsFocused.interpolate({
                    inputRange: [0,1],
                    outputRange: [0, 10]
                }),
                left: animatedIsFocused.interpolate({
                    inputRange: [0,1],
                    outputRange: [60, 15]
                }),
                top: animatedIsFocused.interpolate({
                    inputRange: [0,1],
                    outputRange: [14, -11]
                }),
                color: animatedIsFocused.interpolate({
                    inputRange: [0,1],
                    outputRange: ['#aaa', '#000']
                }),
                position: 'absolute',
                backgroundColor:'white',
                shadowOpacity:0,
            }}>
                {props.label}
            </Animated.Text>
            
            <View style={[styles.container, !isErrorMessageValid ? {
                shadowColor: '#398FCE', borderColor: '#398FCE', marginBottom:25,
            }:{shadowColor: '#E10808', borderColor: '#E10808',}]}>
                {!isErrorMessageValid ? (
                    <Icon style={styles.icon} name={props.icon} type='MaterialCommunityIcons' color='#398FCE'/>
                ) : (
                    <Icon style={styles.icon} name={props.icon} type='MaterialCommunityIcons' color='#E10808'/>
                )}
                {props.secureTextEntry === true ? (
                    <><TextInput
                        style={[styles.textInput, passwordVisible === true ? { width: '65%' } : { width: '48%' }]}
                        value={props.value}
                        onChangeText={props.onChangeText}
                        placeholder={props.placeholder}
                        textContentType={props.type}
                        secureTextEntry={passwordVisible} 
                        placeholderTextColor="#0000004D" 
                        ref={props.ref}
                        onSubmitEditing={props.onSubmitEditing}
                        blurOnSubmit={props.blurOnSubmit}
                        returnKeyType={props.returnKeyType}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        testID={props.testID} 
                        />
                        <TouchableOpacity style={styles.seePassword} onPress={() => 
                            [setPasswordVisible(!passwordVisible)]
                        }>
                            <Text style={{ fontWeight: 'bold', color: '#398FCE' }}>{passwordVisible === true ? 'LIHAT' : 'SEMBUNYIKAN'}</Text>
                        </TouchableOpacity></>
                ) : 
                <TextInput 
                style={styles.textInput}
                value={props.value}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                textContentType={props.type}
                secureTextEntry={passwordVisible}
                placeholderTextColor="#0000004D"
                ref={props.ref}
                onSubmitEditing={props.onSubmitEditing}
                blurOnSubmit={props.blurOnSubmit}
                returnKeyType={props.returnKeyType}
                onFocus={handleFocus}
                onBlur={handleBlur}
                testID={props.testID} 
                />}
            </View>
            {isErrorMessageValid ? (
                <Text style={styles.errorMessage}>{props.errorMessage}</Text>
            ):null}
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        borderRadius:5,
        borderWidth:1,
        flexDirection:'row',
        height:50,
    },
    label:{
        fontSize:16,
    },
    textInput:{
        padding:10,
        fontSize:16,
        width:'83%',
        color:'black',
    },
    icon:{
        padding:10,
        marginLeft:10,
        marginTop:3,
    },
    seePassword:{
        padding:10,
        fontSize:16,
        marginTop:3,
    },
    errorMessage:{
        fontSize:12,
        color:'#E10808',
        marginTop:5,
        marginBottom:20,
        marginHorizontal:15,
    }

});

export default CustomTextInput;