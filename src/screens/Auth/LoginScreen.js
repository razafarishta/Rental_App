import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  loginUser,
  emailChanged,
  passwordChanged,
} from '../../redux/actions/Auth';
import {connect} from 'react-redux';

import {StackActions} from '@react-navigation/native';
const LoginScreen = (props) => {
  const onEmailChange = (text) => {
    props.emailChanged(text);
  };
  const onPasswordChange = (text) => {
    props.passwordChanged(text);
  };
  const onButtonPress = () => {
    // console.log(props)
    const {email, password, navigation} = props;
    // if (email) {

    // }
    props.loginUser({email, password}, navigation);

    console.log(email, password);
  };
  return (
    <View style={{flex: 1, padding: 10, backgroundColor: '#fff'}}>
      <ScrollView
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled">
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>WELCOME</Text>
        <Text style={{color: '#A1A1A1'}}>
          Sign in to your House Rental account.
        </Text>

        <View style={{marginTop: 30}}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#A1A1A1"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#A1A1A1',
            }}
            onChangeText={(email) => {
              onEmailChange(email);
            }}
            value={props.email}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#A1A1A1"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#A1A1A1',
              marginTop: 40,
            }}
            onChangeText={(password) => {
              onPasswordChange(password);
            }}
            value={props.password}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#000000',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              padding: 18,
              marginTop: 15,
            }}
            onPress={() => onButtonPress(props.email, props.password)}>
            <Text style={{color: '#fff'}}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={() => props.navigation.navigate('Register')}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              Tap here to create an account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
const mapStateToProp = ({auth}) => {
  const {email, password} = auth;
  return {
    email,
    password,
  };
};

export default connect(mapStateToProp, {
  loginUser,
  emailChanged,
  passwordChanged,
})(LoginScreen);
