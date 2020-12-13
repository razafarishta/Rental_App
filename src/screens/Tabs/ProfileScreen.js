import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Switch,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';
const {width, height} = Dimensions.get('window');

const ProfileScreen = () => {
  // const [name, setname] = useState(null);
  // const [email, setemail] = useState(null);
  const [data, setdata] = useState([]);
  const [user, setUser] = useState();
  const {uid} = auth().currentUser;
  const [isShareEnabled, setIsShareEnabled] = useState(false);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [sharemodalVisible, setshareModalVisible] = useState(false);
  const [locationmodalVisible, setlocationModalVisible] = useState(false);

  const sharetoggleSwitch = () =>
    setIsShareEnabled((previousState) => !previousState);
  const locationtoggleSwitch = () =>
    setIsLocationEnabled((previousState) => !previousState);

  var alldata = [];

  // useEffect(() => {
  //   firestore()
  //     .collection('user')
  //     // .where('users.uid', '==', auth().currentUser.uid)
  //     .onSnapshot((querySnapshot) => {
  //       querySnapshot.forEach(function (doc) {
  //         console.log('data', doc.data());

  //         alldata.push(doc.data());

  //         setdata(alldata);
  //       });
  //       alldata = [];
  //     });
  // }, []);

  const getUser = async () => {
    try {
      const documentSnapshot = await firestore()
        .collection('user')
        .doc(uid)
        .get();

      const userData = documentSnapshot.data();
      console.log('user data', userData);
      setUser(userData);
    } catch {
      //do whatever
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  // const {item} = props;

  return (
    <View style={{flex: 1, padding: 15}}>
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
          <Text style={{fontSize: 16, marginTop: 5}}>Full Name</Text>
          {/* <TextInput placeholder="Name" style={{borderBottomWidth: 1}} /> */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginTop: 5,
              marginBottom: 5,
            }}>
            {user && user?.name}
          </Text>
          <View style={{borderBottomWidth: 1, borderBottomColor: '#C6C6C6'}} />

          <Text style={{fontSize: 16, marginTop: 5}}>Email</Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginTop: 5,
              marginBottom: 5,
            }}>
            {user?.email}
          </Text>
          <View style={{borderBottomWidth: 1, borderBottomColor: '#C6C6C6'}} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <Text style={{marginTop: 10, fontSize: 16}}>
            Share contact details
          </Text>
          <View
            style={{
              justifyContent: 'flex-end',
              width: width * 0.5,
              // backgroundColor: 'red',
            }}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isShareEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={sharetoggleSwitch}
              value={isShareEnabled}
              style={{justifyContent: 'flex-end'}}
            />
          </View>
          {isShareEnabled ? (
            <Modal
              animationType="slide"
              transparent={true}
              visible={isShareEnabled}
              onRequestClose={() => {
                Alert.alert('Modal has been closed');
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // height: height,
                  // marginTop: 22,
                }}>
                <View
                  style={{
                    // margin: 20,
                    width: width,
                    height: height,
                    backgroundColor: 'white',
                    // borderRadius: 20,
                    // padding: 35,
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
                    onPress={() => setshareModalVisible(!sharemodalVisible)}>
                    <AntDesign name="closecircleo" size={20} style={{}} />
                  </TouchableOpacity>

                  <View style={{marginTop: 20}}>
                    <Image
                      source={require('../../assets/map.png')}
                      style={{width: 300, height: 300, marginTop: 100}}
                      resizeMode="cover"
                    />
                  </View>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    ENABLE LOCATION SERVICES
                  </Text>
                  <Text>Find apartments around you</Text>
                  <TouchableOpacity
                    style={{
                      padding: 15,
                      backgroundColor: '#000',
                      width: width / 1.2,
                      borderRadius: 5,
                      marginTop: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: '#fff'}}>Enable</Text>
                  </TouchableOpacity>
                  <Text style={{marginTop: 10}}>Do not allow</Text>
                </View>
              </View>
            </Modal>
          ) : null}
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={{marginTop: 10, fontSize: 16}}>Enable location</Text>

          <View
            style={{
              justifyContent: 'flex-end',
              width: width * 0.62,
              // backgroundColor: 'red',
            }}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isLocationEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={locationtoggleSwitch}
              value={isLocationEnabled}
              style={{justifyContent: 'flex-end'}}
            />
          </View>
          {isLocationEnabled ? (
            <Modal
              animationType="slide"
              transparent={true}
              visible={isLocationEnabled}
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
                    width: width,

                    // margin: 20,
                    backgroundColor: 'white',
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
                  <Image
                    source={require('../../assets/address.png')}
                    style={{width: 250, height: 300}}
                  />

                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    SHARE CONTACT DETAILS
                  </Text>

                  <Text>Grant House Rental access to your contacts</Text>
                  <TouchableOpacity
                    style={{width: width / 0.8, backgroundColor: '#000'}}>
                    <Text style={{color: '#fff', fontSize: 16}}>Share</Text>
                  </TouchableOpacity>
                  <Text>Do not allow</Text>
                </View>
              </View>
            </Modal>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};
export default ProfileScreen;
