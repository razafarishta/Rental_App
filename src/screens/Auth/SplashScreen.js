import {Image, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = (props) => {
  const handleSplash = async () => {
    setTimeout(async () => {
      // if (props.auth) {
      //   props.navigation.dispatch(StackActions.replace('Login'));
      // } else {
      //   props.navigation.dispatch(StackActions.replace('Main'));
      // }
      if (!props.user) {
        AsyncStorage.getItem('userData').then((response) => {
          console.log(response);
          if (response) {
            response = JSON.parse(response);
            if (response) {
              // props.navigation.navigate('Main');
              props.navigation.dispatch(StackActions.replace('Main'));
            }
          } else {
            props.navigation.dispatch(StackActions.replace('Login'));

            // props.navigation.navigate('Auth');
          }
        });
      }
    }, 1000);
  };
  useEffect(() => {
    handleSplash();
  }, [props.user]);
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 150,
      }}>
      <Image source={require('../../assets/property.png')} />
    </View>
  );
};

const mapStateToProps = (state) => {
  // console.log('auth', auth);
  return {
    auth: state.auth.user,
  };
};
export default connect(mapStateToProps, null)(SplashScreen);
