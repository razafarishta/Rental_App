import React from 'react';
import {View} from 'react-native';

const FoodCard = (props) => {
  return <View style={styles.containerStyle}>{props.children}</View>;
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 10,

    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    // padding: '1%',
    backgroundColor: '#fff',
  },
};

export {FoodCard};
