import {Text, View, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';

const LandingScreen = (props) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        // alignItems: 'center',
        padding: 10,
      }}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../../assets/property.png')}
            style={{height: 200, width: 200}}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <Text style={{color: '#DCDDDD', fontWeight: 'bold', fontSize: 18}}>
            WELCOME TO
          </Text>
          <Text style={{color: '#B48FAB', fontSize: 25, fontWeight: 'bold'}}>
            HOUSE RENTAL
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              paddingLeft: 5,
              paddingRight: 5,
              fontWeight: 'bold',
              fontSize: 16,
              padding: 1,
            }}>
            House Rental helps you get offers and
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 16, padding: 1}}>
            updates on apartments and houses around
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 16, padding: 1}}>
            and outside your location
          </Text>
        </View>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
          }}>
          <Text
            style={{fontSize: 20, fontWeight: 'bold'}}
            onPress={() => props.navigation.navigate('Login')}>
            GET STARTED
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};
export default LandingScreen;
