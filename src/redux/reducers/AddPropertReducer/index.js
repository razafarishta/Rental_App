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
// } from '../../actions/types';

// const INITIAL_STATE = {
//   property: null,
//   city: '',
//   area: '',
//   bed: '',
//   bath: '',
//   price: '',
//   contact: '',
//   imageUrl: '',
//   description: '',
//   title: '',
//   imageUrl: '',
// };

// export default (state = INITIAL_STATE, action) => {
//   // console.log('property', action);
//   switch (action.type) {
//     case PROPERTY:
//       return {
//         ...state,
//         property: action.payload,
//       };

//     case CITY:
//       return {
//         ...state,
//         city: action.payload,
//       };
//     case TITLE:
//       return {
//         ...state,
//         title: action.payload,
//       };
//     case DESCRIPTION:
//       return {
//         ...state,
//         description: action.payload,
//       };
//     case AREA:
//       return {
//         ...state,
//         area: action.payload,
//       };
//     case BED:
//       return {
//         ...state,
//         bed: action.payload,
//       };
//     case BATH:
//       return {
//         ...state,
//         bath: action.payload,
//       };
//     case PRICE:
//       return {
//         ...state,
//         price: action.payload,
//       };
//     case CONTACT:
//       return {
//         ...state,
//         contact: action.payload,
//       };
//     case IMAGE:
//       return {
//         ...state,
//         imageUrl: action.payload,
//       };
//     default:
//       return state;
//   }
// };
