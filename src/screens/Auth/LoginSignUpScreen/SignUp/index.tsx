import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../../../../components/CustomButton';
import CustomTextInput from '../../../../components/CustomTextInput';
import {
    validateEmail,
    validateMdn,
    validatePassword,
    sanitizeMdn,
    validateName,
} from '../../../../helpers';

const SignUp = (props : any) =>{

    const [fullname, setFullname] = useState<string>('');
    const [mdn, setMdn] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // const [repassword, setRepassword] = useState<string>('');
    const [mdnValid, setMdnValid] = useState<boolean>(false);
    const [fullnameValid, setFullnameValid] = useState<boolean>(false);
    const [emailValid, setEmailValid] = useState<boolean>(false);
    const [passwordValid, setPasswordValid] = useState<boolean>(false);
    // const [repasswordValid, setRepasswordValid] = useState<boolean>(false);
    const [buttonStats, setbButtonStats] = useState<boolean>(false);

    const [fullnameErrMessage, setFullnameErrMessage] = useState<string>('');
    const [mdnErrMessage, setMdnErrMessage] = useState<string>('');
    const [emailErrMessage, setEmailErrMessage] = useState<string>('');
    const [passwordErrMessage, setPasswordErrMessage] = useState<string>('');
    // const [repasswordErrMessage, setRepasswordErrMessage] = useState<string>('');


    const fullnameValidation = (fullname : any) => {
        if(fullname.length < 1){
            setFullnameValid(false);
            setFullnameErrMessage('');
        }else if(fullname.length >= 3 && validateName(fullname)){
            setFullnameValid(true);
            setFullnameErrMessage('');
        }else{
            setFullnameValid(false);
            setFullnameErrMessage('Masukkan nama lengkap dengan benar');
        }
    };

    const mdnValidation = (mdn : any) => {
        if(mdn.length < 1){
            setMdnValid(false);
            setMdnErrMessage('');
        }else if(validateMdn(mdn)){
            setMdnValid(true);
            setMdnErrMessage('');
        }else{
            setMdnValid(false);
            setMdnErrMessage('Nomor handphone tidak ditemukan');
        };
    };

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
            setPasswordErrMessage('Minimal 8 karakter dengan numerik, huruf besar dan huruf kecil');
        }
    }

    // const repasswordValidation = (repassword : any) => {
    //     if(repassword.length < 1){
    //         setRepasswordValid(false);
    //         setRepasswordErrMessage('');
    //     }else if(repassword===password){
    //         setRepasswordValid(true);
    //         setRepasswordErrMessage('');
    //     }else{
    //         setRepasswordValid(false);
    //         setRepasswordErrMessage('Password yang dimasukkan tidak sama');
    //     }
    // }
    
    const doSignUP = async () => {
        try{
            const sanitizedMdn = sanitizeMdn(mdn);
            let data = {
                fullname,
                sanitizedMdn,
                email,
                password
            }
            await AsyncStorage.setItem('user', JSON.stringify(data));
            Alert.alert(
                "Status Daftar Akun",
                "Akun anda berhasil dibuat",
                [
                    { text: "OK", onPress: () => {
                        setFullname('');
                        setMdn('');
                        setEmail('');
                        setPassword('');
                    }}
                ]
            )
        }catch(err){
            console.log(err, 'gagal')
        }
        
        
    }

    useEffect(() => {
        fullnameValidation(fullname);
        mdnValidation(mdn);
        emailValidation(email);
        passwordValidation(password);
        //repasswordValidation(repassword);

        const allValid = emailValid && mdnValid && fullnameValid && passwordValid;
        if (allValid) {
            setbButtonStats(true);
        } else {
            setbButtonStats(false);
        }
    }, [fullname, mdn, email, password])

    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={{marginHorizontal:20, marginTop:10}}>
                    <CustomTextInput
                        label='Nama Lengkap'
                        placeholder='Nama Lengkap'
                        icon='account-circle'
                        value={fullname}
                        onChangeText={(text: React.SetStateAction<string>) => setFullname(text)}
                        errorMessage={fullnameErrMessage}
                        testID='signup-input-fullname'
                    />
                    <CustomTextInput
                        label='Nomor Handphone'
                        placeholder='Nomor Handphone'
                        icon='phone'
                        value={mdn}
                        onChangeText={(text: React.SetStateAction<string>) => setMdn(text)}
                        errorMessage={mdnErrMessage}
                        testID='signup-input-mdn'
                    />
                    <CustomTextInput
                        label='Email'
                        placeholder='Email'
                        icon='at'
                        value={email}
                        onChangeText={(text: React.SetStateAction<string>) => setEmail(text)}
                        errorMessage={emailErrMessage}
                        testID='signup-input-email'
                    />
                    <CustomTextInput
                        label='Kata Sandi'
                        placeholder='Kata Sandi'
                        icon='lock-open'
                        value={password}
                        onChangeText={(text: React.SetStateAction<string>) => setPassword(text)}
                        secureTextEntry={true} 
                        errorMessage={passwordErrMessage}
                        testID='signup-input-password'
                    />
                    {/* <CustomTextInput
                        label='Konfirmasi Kata Sandi'
                        placeholder='Konfirmasi Kata Sandi'
                        icon='lock'
                        value={repassword}
                        onChangeText={(text: React.SetStateAction<string>) => setRepassword(text)}
                        secureTextEntry={true} 
                        errorMessage={repasswordErrMessage}
                    /> */}
                    <CustomButton style={{marginBottom:20}} label='DAFTAR' disabled={!buttonStats} onPress={doSignUP} testID='btn-daftar'/>
                </View>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
});

export default SignUp