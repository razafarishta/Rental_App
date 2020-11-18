import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

const NotificationScreen = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        // justifyContent: '',
      }}>
      <Image
        source={require('../../assets/notification.png')}
        style={{width: 100, height: 100}}
      />

      <View style={{marginTop: 300}}>
        <Text style={{marginBottom: 15}}>
          Get notified about new offers and updates
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#000',
          paddingLeft: 80,
          paddingRight: 80,
          padding: 15,
          borderRadius: 8,
        }}>
        <Text style={{color: '#fff'}}>Enable Push Notifications</Text>
      </TouchableOpacity>

      <Text style={{marginTop: 10}}>Do not allow</Text>
    </View>
  );
};
export default NotificationScreen;
