import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';
const FilterCard = ({label, onPress}) => {
  const [checked, setchecked] = useState(false);
  return (
    // <View
    //   style={{
    //     //   width: 45,
    //     height: 35,
    //     borderRadius: 5,
    //     backgroundColor: 'grey',
    //     marginLeft: 10,
    //     padding: 15,
    //     //   padding: 2,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   }}>
    //   <Text>{label}</Text>
    // </View>
    <CheckBox
      // checkedIcon={<Image source={require('../checked.png')} />}
      // uncheckedIcon={<Image source={require('../unchecked.png')} />}
      containerStyle={{borderRadius: 8, padding: 5}}
      title={label}
      checked={checked}
      onPress={onPress}
      // onIconPress={()}
    />
  );
};
export default FilterCard;
