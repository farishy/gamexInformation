import React from 'react'
import Login from '../../Login';
import {render, fireEvent} from '@testing-library/react-native';
import {validateEmail, validatePassword} from '../../../../../helpers';
import { Alert } from 'react-native';

describe('Login Screen', ()=>{
  const { getByTestId, getByText } = render(<Login />);
  const emailInputText = getByTestId('login-input-email');
  const passwordInputText = getByTestId('login-input-password');
  const lupaPasswordHyperlink = getByTestId('btn-lupaPassword');
  const buttonMasuk = getByTestId('btn-masuk');
  const anotherLoginText = getByText('Atau masuk menggunakan');
  const buttonGoogle = getByTestId('btn-google');
  const buttonFacebook = getByTestId('btn-facebook');

  it('should rendering the login screen components', ()=>{
    expect({
      emailInputText, 
      passwordInputText, 
      lupaPasswordHyperlink, 
      buttonMasuk, 
      anotherLoginText, 
      buttonGoogle, 
      buttonFacebook
    }).toBeDefined;
  });
  it('should helpers is working too', ()=>{

    const valueEmail = 'muhammadfaris';
    const valuePassword = 'Testing123';

    const expectValueEmail = validateEmail(valueEmail);
    const expectValuePassword = validatePassword(valuePassword);

    expect(expectValueEmail).not.toBeTruthy();
    expect(expectValuePassword).toBeTruthy();

  });
  it('should change value of input', ()=>{
    const onEventMock = jest.fn();
    const { getByTestId } = render(
      <Login handleChangeText={onEventMock} />
    );
    fireEvent.changeText(getByTestId('login-input-email'), 'onChangeText', 'Muhammadfaris9d@gmail.com');
    fireEvent.changeText(getByTestId('login-input-password'), 'onChangeText', 'Testing1234');
    
    expect(getByTestId('login-input-email')).not.toBeNull();
    expect(getByTestId('login-input-password')).not.toBeNull();

  });
  test('button masuk have disabled', ()=>{
    const onEventMock = jest.fn();
    const { getByTestId } = render(
      <Login onPress={()=> onEventMock}/>
    );
    fireEvent.press(getByTestId('btn-masuk'));
    expect(onEventMock).not.toBeCalled();
  });
  test('login flow', async ()=>{
    const alertMock = jest.spyOn(Alert,'alert').mockImplementation();
    const { getByPlaceholderText, getByText } = render(
      <Login />
    );
    await fireEvent.changeText(getByPlaceholderText('Email'), 'muhammadfaris9d@gmail.com');
    await fireEvent.changeText(getByPlaceholderText('Kata Sandi'), 'Testing1234')
    await fireEvent.press(getByText('MASUK'));
  
    expect(alertMock).toHaveBeenCalled();

  })
});



// import 'react-native'
// import React from 'react'
// import Adapter from 'enzyme-adapter-react-16';
// import {shallow, configure, mount} from 'enzyme'
// import renderer from 'react-test-renderer'
// import Login from '../../Login'
// import CustomTextInput from '../../../../../components/CustomTextInput';
// configure({adapter: new Adapter(), disableLifecycleMethods: true})

// const loginWrapper = shallow(<Login />)

// describe('Login Screen', () => {
//     it('should renders correctly', () => {
//       renderer.create(<Login />)
//     })
   
//     it('should renders `Login Screen` module correctly', () => {
//       expect(loginWrapper).toMatchSnapshot()
//     })
   
//     describe('Check component input file', () => {
//       it('should create TextInput`', () => {
//         expect(loginWrapper.find('TextInput').exists())
//       })
   
//       it('should create button component', () => {
//         expect(loginWrapper.find('TouchableOpacity').exists())
//       })
   
//       describe('Mount component', () => {
//         describe('Event Test', () => {
//           it('should change text when `Input` Change', () => {
//             const mockCallBack = jest.fn()
//             const props = {
//               label: 'Test Label',
//               input: {
//                 mockCallBack
//               },
//               value: 'Hello world',
//           }
//           const wrapper = mount(<CustomTextInput {...props}/>);
//           const event = {
//             target: {
//                 value: 'This is just for test'
//             }
//         }
//             wrapper.find('[data-testID={"input-email"}]').simulate('change', event)
//             expect(mockCallBack).toHaveBeenCalledWith('This is just for test');
//             // loginWrapper.find('[data-testID={"input-email"}]').simulate('change')
//             // expect(mockCallBack.mock.calls.length)
//           })
//           it('should click when lupa password Pressed', () => {
//             const mockCallBack = jest.fn()
//             loginWrapper.find('[data-testID="btn-lupaPassword"]').simulate('press')
//             expect(mockCallBack.mock.calls.length)
//           })
//         })
//       })

//     })
//   })