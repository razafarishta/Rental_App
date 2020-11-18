import React from 'react';
import {Text, TextInput, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Search = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#F7F7F7',
        // borderWidth: 1,
        // borderRadius: 30,
        // bac,
      }}>
      <Ionicons name="ios-search" size={30} style={{padding: 10}} />
      <TextInput
        style={{
          flex: 1,
          paddingTop: 10,
          paddingRight: 10,
          paddingBottom: 10,
          paddingLeft: 10,
          borderRadius: 30,
          backgroundColor: '#F7F7F7',
          color: '#424242',
          fontWeight: 'bold',
        }}
        placeholder="Type Location"
        placeholderTextColor="#000"
      />
    </View>
  );
};
export default Search;
