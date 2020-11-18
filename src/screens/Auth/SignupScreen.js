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

const SignupScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');

  const signUp = () => {
    // if(email === '' || password===''){
    //   alert('oops some field is empty')
    // }else
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        firestore().collection('user').doc(user.user.uid).set({
          name: name,
          email: email,
          password: password,
        });
      })
      .then(() => {
        props.navigation.navigate('Login');
      });
  };
  return (
    <View style={{flex: 1, padding: 10, backgroundColor: '#fff'}}>
      <ScrollView
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled">
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>HI THERE</Text>
        <Text style={{color: '#A1A1A1', marginTop: 3}}>
          Sign in to your House Rental account.
        </Text>

        <View style={{marginTop: 30}}>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#A1A1A1"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#A1A1A1',
            }}
            onChangeText={setName}
            value={name}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#A1A1A1"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#A1A1A1',
              marginTop: 40,
            }}
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#A1A1A1"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#A1A1A1',
              marginTop: 40,
            }}
            onChangeText={setPassword}
            value={password}
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
            onPress={() => signUp()}>
            <Text style={{color: '#fff', fontSize: 16}}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              Tap here to create an account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default SignupScreen;
