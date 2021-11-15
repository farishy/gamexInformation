import { anyTypeAnnotation } from '@babel/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Keyboard, Alert } from 'react-native';
import CustomButton from '../../../../components/CustomButton';
import CustomButtonCircle from '../../../../components/CustomButtonCircle';
import CustomTextInput from '../../../../components/CustomTextInput';
import HyperLink from '../../../../components/HyperLink';
import {validateEmail, validatePassword} from '../../../../helpers';

const Login = (props : any) =>{

    const googleLogo = '../../../../assets/images/google_logo.png'
    const facebookLogo = '../../../../assets/images/facebook_logo.png'
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailValid, setEmailValid] = useState<boolean>(false);
    const [passwordValid, setPasswordValid] = useState<boolean>(false);
    const [buttonStats, setbButtonStats] = useState<boolean>(false);
    const [emailErrMessage, setEmailErrMessage] = useState<string>('');
    const [passwordErrMessage, setPasswordErrMessage] = useState<string>('');

    const emailValidation = (email : any) => {
        if(email.length < 1){
            setEmailValid(false);
            setEmailErrMessage('');
        }else if(validateEmail(email)){
            setEmailValid(true);
            setEmailErrMessage('');
        }else{
            setEmailValid(false);
            setEmailErrMessage('Email tidak valid');
        }
    }

    const passwordValidation = (password : any) => {
        if(password.length < 1){
            setPasswordValid(false);
            setPasswordErrMessage('');
        }else if(validatePassword(password)){
            setPasswordValid(true);
            setPasswordErrMessage('');
        }else{
            setPasswordValid(false);
            setPasswordErrMessage('Password terdiri 8 karakter dengan numerik, huruf besar dan huruf kecil');
        }
    }

    const doLogin = async () => {
        let user = await AsyncStorage.getItem('user');
        let _data = user !== null ? JSON.parse(user) : {};
        if(email===_data.email && password===_data.password){
            Alert.alert(
                "Status Login",
                "Berhasil",
                [
                    { text: "OK", onPress: () => {
                        setEmail('');
                        setPassword('');
                    }}
                ]
            )
        }else{
            Alert.alert(
                "Status Login",
                "Gagal",
                [
                    { text: "OK", onPress: () => {
                        setEmail(email);
                        setPassword(password);
                    }}
                ]
            )
        }
    }

    useEffect(() => {
        emailValidation(email);
        passwordValidation(password);

        const allValid = emailValid && passwordValid;
        if (allValid) {
            setbButtonStats(true);
        } else {
            setbButtonStats(false);
        }
    }, [email, password])

    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={{marginHorizontal:20, marginTop:10}}>
                    <CustomTextInput
                        placeholder='Email'
                        icon='emoticon-happy'
                        label='Email'
                        value={email}
                        onChangeText={(text: React.SetStateAction<string>) => setEmail(text)}
                        errorMessage={emailErrMessage}
                        testID='login-input-email'
                    />
                    <CustomTextInput
                        label='Kata Sandi'
                        placeholder='Kata Sandi'
                        icon='lock'
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text: React.SetStateAction<string>) => setPassword(text)}
                        errorMessage={passwordErrMessage}
                        testID={'login-input-password'}
                    />
                    <HyperLink 
                        label='Lupa Kata Sandi ?'
                        style={{marginBottom:30, height:20,  alignSelf:'flex-end', fontWeight:'bold'}}
                        color='#398FCE'
                        fontWeight='bold'
                        testID='btn-lupaPassword'
                    />
                    <CustomButton style={{marginBottom:20,}} label='MASUK' disabled={!buttonStats} onPress={doLogin} testID='btn-masuk'/>
                    <Text style={{textAlign:'center', fontSize:16, paddingBottom:15, color:'black'}}>Atau masuk menggunakan</Text>
                    <View style={{flexDirection:'row', justifyContent:'center', marginBottom:20}}>  
                        <CustomButtonCircle source={require(googleLogo)} style={styles.CustomButtonCircle} testID='btn-google'/>
                        <CustomButtonCircle source={require(facebookLogo)} size={30} style={styles.CustomButtonCircle} testID='btn-facebook'/>
                    </View>
                </View>
            
            </ScrollView>
            
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    CustomButtonCircle:{
        padding:10,
    }

});

export default Login