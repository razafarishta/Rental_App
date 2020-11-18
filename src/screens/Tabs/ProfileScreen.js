import React from 'react';
import {Text, View, Image, TextInput, ScrollView} from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={{flex: 1, padding: 10}}>
      <ScrollView>
        <View
          style={{
            // backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            // padding: 10,
          }}>
          <Image source={require('../../assets/man.png')} style={{}} />
          <Text style={{fontWeight: 'bold', fontSize: 16}}>Sign Out</Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={{fontSize: 16}}>Full Name</Text>
          <TextInput placeholder="Name" style={{borderBottomWidth: 1}} />

          <Text style={{fontSize: 16}}>Full Name</Text>
          <TextInput
            placeholder="Mobile Number"
            style={{borderBottomWidth: 1}}
          />
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={{marginTop: 10, fontSize: 16}}>
            Share contact details
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={{marginTop: 10, fontSize: 16}}>Enable location</Text>
        </View>
      </ScrollView>
    </View>
  );
};
export default ProfileScreen;
