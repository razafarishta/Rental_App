// import Slider from '@react-native-community/slider';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
// import {Slider} from 'react-native-elements';
import FilterCard from '../../components/FilterCard';
import Slider from '@react-native-community/slider';
import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';

const FilterScreen = () => {
  var filterData = [];
  const [value, setvalue] = useState(0);
  const [data, setdata] = useState([]);

  const [products, setproducts] = useState('');
  const [isfilterActive, setisfilteractive] = useState('');
  const [count, setcount] = useState(0);
  useEffect(() => {
    // var alldata = [];
    // firestore()
    //   .collection('Property')
    //   // .where('users.uid', '==', auth().currentUser.uid)
    //   .onSnapshot((querySnapshot) => {
    //     querySnapshot.forEach(function (doc) {
    //       console.log('data', doc.data().rent);
    //       alldata.push({...doc.data()});
    //       setdata(alldata);
    //     });
    //     alldata = [];
    //     const filterdata = data.filter((data) => {
    //       return data.rent == true;
    //     });
    //     setdata(filterdata);
    //     console.log(filterdata);
    //   });
    // filterdata();
  }, []);

  const filterdata = () => {
    firestore()
      .collection('Property')
      .where('rent', '==', false)
      .where('bed', '==', '2')
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          console.log('filter', doc.data());
          filterData.push({...doc.data()});
          setdata(filterData);
        });
        filterData = [];
      });
  };
  const rentData = () => {
    var alldata = [];
    firestore()
      .collection('Property')
      // .where('users.uid', '==', auth().currentUser.uid)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          console.log('data', doc.data());

          alldata.push({...doc.data()});
          const filterdata = alldata.filter((alldata) => {
            return alldata.rent === true && alldata.price >= 100;
          });
          alldata.push(filterData);
          setdata(filterData);
          console.log('filter', alldata);
          // setdata(alldata);
        });

        alldata = [];
      });
  };

  // const filterProducts =()=>{
  //   let query = {
  //     rent,
  //     sell,
  //     bed
  //   }
  // }
  // const onButtonPress = () => {
  //   const filterdata=data
  //     .filter((item)=>{ return  item.rent == true})
  //     setdata(filterdata)
  // };

  return (
    <View
      style={{
        padding: 10,
        justifyContent: 'center',
        // paddingTop: 0,
      }}>
      {/* <Text>Filter Screen</Text> */}
      <Text style={{fontWeight: 'bold', fontSize: 16, paddingLeft: 20}}>
        Tenant Type
      </Text>
      <View
        style={{
          flexDirection: 'row',
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: 10,
        }}>
        <FilterCard label="2bhk" onPress={() => rentData()} />
        <FilterCard label="Family" />
        <FilterCard label="Couple" />
        {/* <FilterCard label="Family" /> */}
      </View>
      {/* <FilterCard label="Family" /> */}
      <Text style={{fontWeight: 'bold', fontSize: 16, paddingLeft: 20}}>
        Apartment Types
      </Text>

      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          paddingLeft: 5,
          paddingRight: 5,
        }}>
        <FilterCard label="rent" />
        <FilterCard label="sell" />
        {/* <FilterCard label="Couple" /> */}
      </View>

      <Text style={{fontWeight: 'bold', fontSize: 16, paddingLeft: 20}}>
        Facilities
      </Text>

      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          paddingLeft: 5,
          paddingRight: 5,
        }}>
        <FilterCard label="2bhk" />
        <FilterCard label="Family" />
        <FilterCard label="Couple" />
      </View>

      <View>
        {/* <Slider
          value={value}
          onValueChange={(value) => setvalue({value})}
          maximumValue={50}
          minimumValue={20}
        />
        <Text>Value: {value}</Text> */}
        {/* <Slider
          style={{width: 200, height: 40}}
          value={setvalue + 1}
          step={0.5}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
        <Text>{value}</Text> */}
      </View>
    </View>
  );
};
export default FilterScreen;
