import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';

// import {
//   cityChanged,
//   areaChanged,
//   titleChanged,
//   descriptionChanged,
//   bedChanged,
//   bathChanged,
//   contactChanged,
//   priceChanged,
//   uploadData,
// } from '../redux/actions/AddPropertyAction';
import {Picker} from '@react-native-picker/picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// import {connect} from 'react-redux';
// import ImageCropPicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-picker';
import Spinner from '../components/Spinner';
import {connect} from 'react-redux';
const AddProperty = (props) => {
  var options = {
    title: 'UPLOAD PHOTO',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
  };
  var sourcePath = '';
  // var downloadURLGlobal = '';
  // let actionSheet = useRef();
  // var ActionSheet = '';
  const [city, setCity] = useState('');
  const [address, setaddress] = useState('');
  const [type, setType] = useState('');
  const [sell, setsell] = useState(false);
  const [rent, setrent] = useState(false);

  const [purpose, setPurpose] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [area, setArea] = useState('');
  const [price, setPrice] = useState('');
  const [bed, setBed] = useState('');
  const [bath, setBath] = useState('');
  const [contact, setContact] = useState('');
  const [pic, setPic] = useState('');
  // const
  const [image, setimage] = useState('');
  // const [imageUrl, setimageUrl] = useState('');
  const [loading, setloading] = useState(false);
  const [loader, setloader] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  // const [imageUri, setImageUri] = useState('');
  const [imageData, setImageData] = useState('');
  const [visible, setvisible] = useState(false);
  // const [percentUploaded, setpercentUploaded] = useState('');

  // const uploadData = () => {
  //   setloader({loader: true});
  //   var timestamp = new Date().getTime().toString();
  //   console.log('upload file called');
  //   if (imageUrl != '') {
  //     var metadata = {
  //       contentType: 'image/jpeg',
  //     };
  //     console.log('meta', metadata);
  //     console.log('image', imageUrl);
  //     var fileRef = storage().ref(`images/`).child(timestamp);
  //     var uploadTask = fileRef.putFile(imageUrl, metadata);
  //     if (uploadTask === undefined || uploadTask === '') {
  //       Alert.alert('Unable to  upload');
  //     }
  //     uploadTask.on(
  //       'state_changed',
  //       (snap) => {
  //         const percentUploaded = Math.round(
  //           (snap.bytesTransferred / snap.totalBytes) * 100,
  //         );
  //         console.log('Percentage', percentUploaded);
  //         setpercentUploaded({percentUploaded}, () => {
  //           if (percentUploaded === 100) {
  //             // this.setState({loading: true});
  //             setloading({loading: true});
  //           }
  //         });
  //       },
  //       () => {
  //         //unsuccessful Upload
  //       },
  //       () => {
  //         var fileR = storage().ref(`images/`).child(timestamp);
  //         // Upload completed successfully, now we can get the download URL
  //         fileR.getDownloadURL().then((downloadURL) => {
  //           downloadURLGlobal = downloadURL;
  //           console.log('downloadURLGlobal', downloadURLGlobal);
  //           console.log('downloadURL', downloadURL);

  //           // this.setState({ imageUrl: downloadURLGlobal });
  //           firestore()
  //             .collection('Property')
  //             .add({
  //               city: city,
  //               title: title,
  //               description: description,
  //               area: area,
  //               price: price,
  //               bed: bed,
  //               bath: bath,
  //               contact: contact,
  //               imageUrl: downloadURLGlobal,
  //               users: {
  //                 uid: auth().currentUser.uid,
  //               },
  //             })
  //             .then(() => {
  //               setloader({loader: false});
  //               props.navigation.navigate('Main');
  //             })
  //             .catch((err) => {
  //               alert(err);
  //             });
  //         });
  //       },
  //     );
  //   }
  // };

  const openPic = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      setvisible(true);
      if (response.didCancel) {
        setvisible(false);
        console.log('User cancelled image picker');
      } else if (response.error) {
        setvisible(false);
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};

        sourcePath = {uri: response.uri};

        if (Platform.OS === 'ios') {
          sourcePath = {uri: response.uri};
        } else {
          sourcePath = {uri: response.path};
          console.log('sorce', sourcePath);
        }

        setImageUrl(source);
        // setImageUri(response.uri)
        var user_id = auth().currentUser.uid;
        var firebaseStorageRef = storage().ref('images/');
        const imageRef = firebaseStorageRef.child(
          'user/' + user_id + '/' + `${Math.random()}.jpg`,
        );

        var image_uri = imageRef
          .putFile(sourcePath.uri, {contentType: 'image/jpg'})
          .then(function () {
            return imageRef.getDownloadURL();
            //   console.log("Image Url is: ",image_url)
          })
          .then((url) => {
            setvisible(false);
            setImageData(url);
            console.log('urrl is:', url);

            console.log('image data is', imageData);
            // firebase.database().ref("users/"+user_id).update({image_url:url})
            //   this.setState({ avatarSource: { uri: url } }, () => {
            // this.setState({ loading: false })
            // firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).update({
            //   photoURL: url
            // })
            //   })
          });
      }
    });
  };

  const uploadData = () => {
    // user_id =firebase.auth().currentUser.uid
    firestore()
      .collection('Property')
      .add({
        city: city,
        address: address,
        sell: sell,
        rent: rent,
        title: title,
        description: description,
        area: area,
        price: price,
        bed: bed,
        bath: bath,
        contact: contact,
        imageUrl: imageData,
        users: {
          uid: auth().currentUser.uid,
          name: props.name,
        },
      })
      .then(() => {
        // setloader({loader: false});
        props.navigation.navigate('Main');
      });
  };

  // const showActionSheet = () => {
  //   actionSheet.current.show();
  // };
  // const onPressAttach = (index) => {
  //   if (index === 1) {
  //     setimageUrl({imageUrl: ''});
  //     openImage();
  //   } else if (index === 0) {
  //     setimageUrl({imageUrl: ''});
  //     openCamera();
  //   }
  // };

  // const openImage = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 300,

  //     cropping: true,
  //   }).then((image) => {
  //     console.log(image);
  //     if (Platform.OS === 'ios') {
  //       console.log(image);
  //       sourcePath = {uri: image.sourceURL};
  //     } else {
  //       sourcePath = {uri: image.path};
  //     }
  //     // this.setState(
  //     //   {
  //     //     imageUrl: sourcePath.uri,
  //     //   },
  //     //   () => {
  //     //     console.log('a',imageUrl);
  //     //   },
  //     // );
  //     setimageUrl(
  //       {
  //         imageUrl: sourcePath.uri,
  //       },
  //       () => {
  //         console.log('a', imageUrl);
  //       },
  //     );
  //   });
  // };

  // const openCamera = () => {
  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   }).then((image) => {
  //     console.log(image);
  //     if (Platform.OS === 'ios') {
  //       console.log(image);
  //       sourcePath = {uri: image.sourceURL};
  //     } else {
  //       sourcePath = {uri: image.path};
  //     }
  //     setimageUrl(
  //       {
  //         imageUrl: sourcePath.uri,
  //       },
  //       () => {
  //         console.log('a', imageUrl);
  //       },
  //     );
  //   });
  // };
  // };

  return (
    <View style={{flex: 1, padding: 10}}>
      <ScrollView
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled">
        {loader ? (
          <View
            style={{
              // flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.2)',
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
            }}>
            <Spinner />
          </View>
        ) : null}
        <View style={{backgroundColor: '#fff', marginTop: 5, borderRadius: 10}}>
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 18, paddingLeft: 5, fontWeight: 'bold'}}>
                Location
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                flexDirection: 'row',
                // marginTop: 5,
                justifyContent: 'space-between',
                margin: 5,
                // backgroundColor: 'green',
              }}>
              <Text style={{fontSize: 16}}>Adding in </Text>

              {/* <Text style={{fontSize: 18}}> Change City</Text> */}
              <Picker
                selectedValue={city}
                style={{width: 120}}
                onValueChange={
                  (itemValue, item) => setCity({city: itemValue})
                  // onCityChange({city: itemValue})
                }>
                <Picker.Item label="Karachi" value="Karachi" />
                <Picker.Item label="Lahore" value="Lahore" />
                <Picker.Item label="Islamabad" value="Islamabad" />
                <Picker.Item label="Multan" value="Multan" />
                <Picker.Item label="Quetta" value="Quetta" />
              </Picker>
            </View>
            <TextInput
              style={{
                borderRadius: 8,
                borderWidth: 1,
                height: 40,
                marginLeft: 5,
                marginRight: 5,
                marginBottom: 10,
              }}
              placeholder="Add Address"
              onChangeText={(address) => setaddress(address)}
            />
          </View>
        </View>

        <View
          style={{backgroundColor: '#fff', marginTop: 10, borderRadius: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 5}}>
              Purpose
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 8,
              marginBottom: 8,

              // alignItems: 'center',
            }}>
            {sell == true ? (
              <TouchableOpacity
                style={{
                  backgroundColor: 'green',
                  borderRadius: 15,
                  width: 70,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 5,
                }}
                onPress={() => setsell(true)}>
                <Text>Sell</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: 'blue',
                  borderRadius: 15,
                  width: 70,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 5,
                }}
                onPress={() => setsell(true)}>
                <Text>Sell</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={{
                backgroundColor: 'grey',
                borderRadius: 15,
                width: 70,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setrent(true)}>
              <Text>Rent</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={{
                backgroundColor: 'grey',
                borderRadius: 15,
                width: 70,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>Wanted</Text>
            </TouchableOpacity> */}
          </View>
        </View>

        <View style={{marginTop: 10, backgroundColor: '#fff'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Property Details
            </Text>
          </View>

          <TextInput
            style={{borderBottomWidth: 1}}
            placeholder="Property Title"
            // onChangeText={(title) => onTitleChange(title)}
            onChangeText={(title) => setTitle(title)}
            value={title}
          />

          <TextInput
            style={{borderBottomWidth: 1, marginBottom: 8}}
            placeholder="Property Description"
            // onChangeText={(description) => onDescriptionChange(description)}
            onChangeText={(description) => setDescription(description)}
            value={description}
          />
        </View>

        <View style={{backgroundColor: '#fff', marginTop: 10, borderRadius: 5}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginLeft: 5, fontWeight: 'bold', fontSize: 16}}>
              Area
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 8}}>
            <TextInput
              style={{
                width: 160,
                borderWidth: 1,
                marginLeft: 20,
                padding: 5,
                borderRadius: 20,
              }}
              placeholder="Area"
              keyboardType="number-pad"
              onChangeText={(area) => setArea(area)}
              value={area}
            />
          </View>
        </View>

        <View style={{backgroundColor: '#fff', marginTop: 10, borderRadius: 8}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginLeft: 5, fontSize: 16, fontWeight: 'bold'}}>
              price
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 8}}>
            <TextInput
              style={{
                width: 160,
                borderWidth: 1,
                marginLeft: 20,
                padding: 5,
                borderRadius: 20,
              }}
              onChangeText={(price) => setPrice(price)}
              value={price}
              keyboardType="number-pad"
              placeholder="Price"
            />
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            marginTop: 10,
            marginBottom: 10,
            borderRadius: 5,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16, marginLeft: 5}}>
            BedRoom(s)
          </Text>
          <TextInput
            placeholder="Type number of Bedrooms"
            style={{borderBottomWidth: 1, marginBottom: 10}}
            keyboardType="number-pad"
            onChangeText={(bed) => setBed(bed)}
            value={bed}
          />
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            marginTop: 10,
            marginBottom: 10,
            borderRadius: 5,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16, marginLeft: 5}}>
            BathRoom(s)
          </Text>
          <TextInput
            placeholder="Type number of Bathrooms"
            style={{borderBottomWidth: 1, marginBottom: 10}}
            keyboardType="number-pad"
            onChangeText={(bath) => setBath(bath)}
            value={bath}
          />
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            marginTop: 10,
            marginBottom: 10,
            borderRadius: 5,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 5}}>
            Contact Details
          </Text>
          <TextInput
            placeholder="Enter phone no"
            style={{borderBottomWidth: 1, marginBottom: 10}}
            keyboardType="number-pad"
            onChangeText={(contact) => setContact(contact)}
            value={contact}
          />
        </View>
        <View>
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={() => openPic()}>
            <Image
              source={require('../assets/home.png')}
              style={{width: 100, height: 100}}
            />
            <Text>please upload picture</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#000',
              padding: 15,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              marginBottom: 15,
              marginTop: 15,
            }}
            onPress={() => uploadData()}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              upload Data
            </Text>
          </TouchableOpacity>
        </View>
        {/* <ActionSheet
          ref={actionSheet}
          title={'Select Any One'}
          options={['Camera', 'Choose From Gallery']}
          cancelButtonIndex={2}
          tintColor={'#0FB6FF'}
          onPress={(index) => {
            onPressAttach(index);
          }}
        /> */}
      </ScrollView>
    </View>
  );
};
const mapStateToProps = ({auth}) => {
  const {name} = auth;
  return {
    name,
  };
};
export default connect(mapStateToProps)(AddProperty);
