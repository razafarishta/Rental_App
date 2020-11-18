import React from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
const {width, height} = Dimensions.get('window');
const RentDetail = (props) => {
  // const []
  console.log(props.route.params.item.title);
  const {item} = props.route.params;
  return (
    <View style={{flex: 1}}>
      <Image
        source={{uri: item.imageUrl}}
        style={{width: width, height: 200}}
        resizeMode="cover"
      />
      <View style={{padding: 10}}>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
        <Text style={{marginTop: 10}}>{item.price}</Text>
        <Text>Per Month</Text>
      </View>
    </View>
  );
};
export default RentDetail;
