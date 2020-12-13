import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {StackActions} from '@react-navigation/native';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGOUT_SUCCESS,
} from '../types';
export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text,
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text,
  };
};

export const loginUser = ({email, password}, navigation) => {
  // let response = {email, password};
  let user = {email, password};
  return (dispatch) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user.user.uid);
        firestore()
          .collection('user')
          .doc(user.user.uid)
          .get()
          .then(() => {
            AsyncStorage.setItem('userData', JSON.stringify(user)).then(() => {
              console.log(user, 'Successfully');
              // navigation.navigate('Root', {screen: 'Dashboard'});
              // props.navigation.dispatch(StackActions.replace('Main'));
            });
            navigation.dispatch(StackActions.replace('Main'));

            // console.log(user.data());
            // props.loginUser(user.data());
          });
      })
      .catch((error) => {
        alert(error.message);
      });
    dispatch({type: LOGIN_USER, payload: user});
  };
};

export const logout = (navigation) => {
  return (dispatch) => {
    // dispatch({type: LOGOUT_LOADING});
    try {
      firestore
        .auth()
        .signOut()
        .then(() => {
          AsyncStorage.removeItem('userData').then(() => {
            navigation.navigate('Login');
          });
          dispatch({type: LOGOUT_SUCCESS});
        });
    } catch (error) {
      //   dispatch({type: LOGOUT_FAILED});
    }
  };
};
