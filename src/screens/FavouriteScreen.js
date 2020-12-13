import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {FoodCard} from '../components/FoodCard';
import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';
var favourite = [];
const FavouriteScreen = () => {
  const [favourite, setfavourite] = useState([]);
  const [data, setdata] = useState([]);
  useEffect(() => {
    firestore()
      .collection('Favourite')
      .doc(auth().currentUser.uid)
      .onSnapshot((querySnapshot) => {
        // if (querySnapshot.exists) {
        console.log('favo', querySnapshot.data().favourite);
        firestore()
          .collection('Property')
          .where(
            firestore.FieldPath.documentId(),
            'in',
            querySnapshot.data().favourite,
          )
          .onSnapshot((snap) => {
            snap.forEach(function (doc) {
              console.log('Favourite', doc.data());
              favourite.push(doc.data());
            });

            setfavourite({favourite});
            // var favourite = [];
          });
      });
  }, []);

  return (
    <View>
      <FlatList
        data={favourite}
        renderItem={({item}) => {
          console.log(item);
          return <FoodCard favourite item={item} />;
        }}
      />
    </View>
  );
};
export default FavouriteScreen;
