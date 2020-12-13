import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  View,
  Modal,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Linking,
  TouchableHighlight,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';
const {width, height} = Dimensions.get('window');
const RentDetail = (props) => {
  // const []
  const [modalVisible, setModalVisible] = useState(false);

  // useEffect(()=>{
  //   firestore().collection('Property').
  // },[])
  console.log(props.route.params.item);
  const {item} = props.route.params;
  const onCallPressed = () => {
    var phoneNo;
    if (Platform.OS !== 'android') {
      phoneNo = `telprompt:${item.contact}`;
    } else {
      phoneNo = `tel::${item.contact}`;
    }
    Linking.canOpenURL(phoneNo)
      .then((supported) => {
        if (!supported) {
          Alert.alert('phone number not available');
        } else {
          Linking.openURL(phoneNo);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <Image
          source={{uri: item.imageUrl}}
          style={{width: width, height: 200}}
          resizeMode="cover"
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed');
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 22,
            }}>
            <View
              style={{
                margin: 20,
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 35,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              {/* <Text style={{marginBottom: 15, textAlign: 'center'}}>
                Hello World!
              </Text> */}
              <TouchableOpacity
                style={{position: 'absolute', top: 0, left: 0, margin: 10}}
                onPress={() => setModalVisible(!modalVisible)}>
                <AntDesign name="closecircleo" size={20} style={{}} />
              </TouchableOpacity>
              <Ionicons
                name="ios-call-outline"
                size={30}
                style={{marginBottom: 25, textAlign: 'center'}}
              />
              <Text
                style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
                HI THERE
              </Text>
              <Text style={{color: '#C6C6C6', marginTop: 5}}>
                The contact person for this apartment is
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 16, marginTop: 5}}>
                {item.users.name}
              </Text>
              <Text style={{marginTop: 5}}>Call: {item.contact}</Text>
              {/* <TouchableHighlight
                style={{...styles.openButton, backgroundColor: '#2196F3'}}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight> */}
              <TouchableOpacity
                style={{
                  // paddingLeft: 30,
                  // paddingTop: 30,
                  // paddingBottom: 30,
                  padding: 10,
                  width: 250,
                  borderRadius: 5,
                  // margin: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#000',
                  marginTop: 10,
                }}
                onPress={() => onCallPressed()}>
                <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                  Call
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={{padding: 15}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}>
            {item.title}
          </Text>
          <Text style={{color: '#8A8A8A'}}>{item.address}</Text>
          <Text style={{marginTop: 10, fontSize: 16, fontWeight: 'bold'}}>
            {item.price}
          </Text>
          <Text>Per Month</Text>
        </View>

        <View style={{padding: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Feather name="layout" size={30} />
            <View
              style={{
                flexDirection: 'column',
                // backgroundColor: 'red',
                paddingLeft: 5,
                justifyContent: 'center',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>Layout</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#8A8A8A'}}>{item.bed} bedrooms , </Text>
                <Text style={{color: '#8A8A8A'}}>{item.bath} bathrooms </Text>
              </View>
            </View>
          </View>

          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
            <Feather name="info" size={30} />
            <View
              style={{
                flexDirection: 'column',
                // backgroundColor: 'red',
                paddingLeft: 5,
                justifyContent: 'center',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                Rent Details
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#8A8A8A'}}>
                  {item.price} (negotiable) - Maintenance (1500/month)
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            alignSelf: 'flex-end',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 15,
          }}>
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: '#000',
              // justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              // alignSelf: 'flex-end',
              // position: 'absolute',
              // bottom: 35,
            }}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
              Contact Owner
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});
export default RentDetail;
