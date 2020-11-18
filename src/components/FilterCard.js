import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

const FilterCard = ({label}) => {
  return (
    <View
      style={{
        //   width: 45,
        height: 35,
        borderRadius: 5,
        backgroundColor: 'grey',
        marginLeft: 10,
        padding: 15,
        //   padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>{label}</Text>
    </View>
  );
};
export default FilterCard;
