import React from 'react'
import Signup from '../../SignUp';
import {render, fireEvent} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import {
    validateEmail,
    validateMdn,
    validatePassword,
    sanitizeMdn,
    validateName,
} from '../../../../../helpers';
import { Alert } from 'react-native';

describe('Sign Up Screen', ()=>{
    const { getByTestId, getByText } = render(<Signup />);
    const fullnameInputText = getByTestId('signup-input-fullname');
    const mdnInputText = getByTestId('signup-input-mdn');
    const emailInputText = getByTestId('signup-input-email');
    const passwordInputText = getByTestId('signup-input-password');
    const buttonDaftar = getByTestId('btn-daftar');

    it('should rendering the login screen components', ()=>{
        expect({
          fullnameInputText, 
          mdnInputText, 
          emailInputText, 
          passwordInputText, 
          buttonDaftar,
        }).toBeDefined;
      });

    test('button daftar have been disabled', ()=>{
        const { getByTestId } = render(
            <Signup />
        );
        expect(getByTestId('btn-daftar')).toBeDisabled;
    });

    test('button daftar have been enabled', async ()=>{
        const onEventMock = jest.fn();
        const { getByTestId } = render(
            <Signup handleChangeText={onEventMock} />
        );
        await fireEvent.changeText(getByTestId('signup-input-fullname'), 'onChangeText', 'Muhammad Faris');
        await fireEvent.changeText(getByTestId('signup-input-mdn'), 'onChangeText', '082213669444');
        await fireEvent.changeText(getByTestId('signup-input-email'), 'onChangeText', 'Muhammadfaris9d@gmail.com');
        await fireEvent.changeText(getByTestId('signup-input-password'), 'onChangeText', 'test');

        fireEvent.press(getByTestId('btn-daftar'));
        expect(getByTestId('btn-daftar')).toBeEnabled();
    });
    describe('helper testing', ()=>{
        test('the name should not be verified',()=>{
            const nameValue = 'Muhammad 123';
            const nameValue_2 = 'Jr. Downson Muhammad'; 
            
            const expectValue = validateName(nameValue);
            const expectValue_2 = validateName(nameValue_2);

            expect(expectValue).not.toBeTruthy();
            expect(expectValue_2).toBeTruthy();
        });
        test('validate and sanitize mdn', ()=>{
            const mdnValue_1 = '82213669444';
            const mdnValue_2 = '+6282213669444';
            const mdnValue_3 = '082213669444';

            const expectMdn = '62882213669444';

            const expect_validateMdn_1 = validateMdn(mdnValue_1);
            const expect_validateMdn_2 = validateMdn(mdnValue_2);
            const expect_validateMdn_3 = validateMdn(mdnValue_3);

            const sanitizeMdn_1 = sanitizeMdn(mdnValue_1);
            const sanitizeMdn_2 = sanitizeMdn(mdnValue_2);
            const sanitizeMdn_3 = sanitizeMdn(mdnValue_3);

            expect(expect_validateMdn_1).toBeTruthy();
            expect(expect_validateMdn_2).toBeTruthy();
            expect(expect_validateMdn_3).toBeTruthy();

            expect(sanitizeMdn_1).toEqual(expectMdn);
            expect(sanitizeMdn_2).toEqual(expectMdn);
            expect(sanitizeMdn_3).toEqual(expectMdn);

        });
        test('validate email', ()=>{
            const valueEmail = 'muhammadfaris';
            const valueEmail_2 = 'muhammadfaris@gmail.com';
        
            const expectValueEmail = validateEmail(valueEmail);
            const expectValueEmail_2 = validateEmail(valueEmail_2);

            expect(expectValueEmail).not.toBeTruthy();
            expect(expectValueEmail_2).toBeTruthy();
            
          });
          test('validate password',()=>{
            const valuePassword = 'Testing123';
            const expectValuePassword = validatePassword(valuePassword);
            expect(expectValuePassword).toBeTruthy();
          });
    });
    test('register flow', async ()=>{
        const alertMock = jest.spyOn(Alert,'alert').mockImplementation();
        const { getByPlaceholderText, getByText } = render(
          <Signup />
        );
        await fireEvent.changeText(getByPlaceholderText('Nama Lengkap'), 'Muhammad Faris');
        await fireEvent.changeText(getByPlaceholderText('Nomor Handphone'), '+6282213669444')
        await fireEvent.changeText(getByPlaceholderText('Email'), 'muhammadfaris9d@gmail.com')
        await fireEvent.changeText(getByPlaceholderText('Kata Sandi'), 'Testing1234')
        await fireEvent.press(getByText('DAFTAR'));
      
        expect(alertMock).toHaveBeenCalled();
      });

});