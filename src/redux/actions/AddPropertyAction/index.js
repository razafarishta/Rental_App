// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import storage from '@react-native-firebase/storage';

// // import {Alert} from 'react-native';
// import {
//   AREA,
//   BATH,
//   BED,
//   CITY,
//   CONTACT,
//   DESCRIPTION,
//   IMAGE,
//   PRICE,
//   PROPERTY,
//   TITLE,
// } from '../types';

// export const cityChanged = (text) => {
//   return {
//     type: CITY,
//     payload: text,
//   };
// };
// export const titleChanged = (text) => {
//   return {
//     type: TITLE,
//     payload: text,
//   };
// };

// export const descriptionChanged = (text) => {
//   return {
//     type: DESCRIPTION,
//     payload: text,
//   };
// };
// export const areaChanged = (text) => {
//   return {
//     type: AREA,
//     payload: text,
//   };
// };
// export const priceChanged = (text) => {
//   return {
//     type: PRICE,
//     payload: text,
//   };
// };
// export const bedChanged = (text) => {
//   return {
//     type: BED,
//     payload: text,
//   };
// };
// export const bathChanged = (text) => {
//   return {
//     type: BATH,
//     payload: text,
//   };
// };
// // export const priceChanged = (text) => {
// //   return {
// //     type: PRICE,
// //     payload: text,
// //   };
// // };
// export const contactChanged = (text) => {
//   return {
//     type: CONTACT,
//     payload: text,
//   };
// };
// export const imageChanged = (imagee) => {
//   return {
//     type: IMAGE,
//     payload: imagee,
//   };
// };
// // export const

// export const uploadData = (
//   {
//     city,
//     area,
//     title,
//     description,
//     bed,
//     bath,
//     contact,
//     price,
//     property,
//     imageUrl,
//   },
//   navigation,
// ) => {
//   return (dispatch) => {
//     // this.setState({loader: true});
//     var timestamp = new Date().getTime().toString();
//     console.log('upload file called');
//     if (imageUrl != '') {
//       var metadata = {
//         contentType: 'image/jpeg',
//       };
//       var fileRef = storage().ref(`Property/`).child(timestamp);
//       var uploadTask = fileRef.putFile(imageUrl, metadata);
//       if (uploadTask === undefined || uploadTask === '') {
//         Alert.alert('Unable to  upload');
//       }
//       uploadTask.on(
//         'state_changed',
//         (snap) => {
//           const percentUploaded = Math.round(
//             (snap.bytesTransferred / snap.totalBytes) * 100,
//           );
//           console.log('Percentage', percentUploaded);
//           this.setState({percentUploaded}, () => {
//             if (this.state.percentUploaded === 100) {
//               // this.setState({loading: true});
//             }
//           });
//         },
//         () => {
//           //unsuccessful Upload
//         },
//         () => {
//           var fileR = storage().ref(`Property/`).child(timestamp);
//           // Upload completed successfully, now we can get the download URL
//           fileR.getDownloadURL().then((downloadURL) => {
//             downloadURLGlobal = downloadURL;
//             console.log('downloadURLGlobal', downloadURLGlobal);
//             console.log('downloadURL', downloadURL);

//             firestore()
//               .collection('Property')
//               .add({
//                 city: city,
//                 title: title,
//                 description: description,
//                 area: area,
//                 price: price,
//                 bed: bed,
//                 bath: bath,
//                 contact: contact,
//                 // imageUrl: downloadURLGlobal,
//                 users: {
//                   uid: auth().currentUser.uid,
//                 },
//               })
//               .then(() => {
//                 //   this.setState({loader: false});
//                 navigation.navigate('Main');
//                 dispatch({type: PROPERTY, payload: property});
//               })
//               .catch((err) => {
//                 alert(err);
//               });
//           });
//         },
//       );
//     }
//   };
// };
