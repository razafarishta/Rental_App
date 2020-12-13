import React, {useEffect} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';

const SignoutScreen = () => {
  return (
    <View style={{flex: 1}}>
      <View>
        <Image source={require('../../assets/man.png')} />
      </View>
    </View>
  );
};

export default SignoutScreen;
