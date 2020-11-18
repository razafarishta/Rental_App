import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGOUT_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  email: 'raza@gmail.com',
  password: '123456',
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return {...state, email: action.payload};
    case PASSWORD_CHANGED:
      return {...state, password: action.payload};

    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};
