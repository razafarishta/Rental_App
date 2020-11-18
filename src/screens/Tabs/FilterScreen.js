import React from 'react';
import {Text, View} from 'react-native';
import FilterCard from '../../components/FilterCard';

const FilterScreen = () => {
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
      <View style={{flexDirection: 'row', paddingLeft: 15, paddingTop: 10}}>
        <FilterCard label="2bhk" />
        <FilterCard label="Family" />
        <FilterCard label="Couple" />
        <FilterCard label="Single" />
        {/* <FilterCard label="Family" /> */}
      </View>
      {/* <FilterCard label="Family" /> */}
      <Text style={{fontWeight: 'bold', fontSize: 16, paddingLeft: 20}}>
        Apartment Types
      </Text>

      <View style={{flexDirection: 'row', padding: 10}}>
        <FilterCard label="2bhk" />
        <FilterCard label="Family" />
        <FilterCard label="Couple" />
        <FilterCard label="Single" />
      </View>

      <Text style={{fontWeight: 'bold', fontSize: 16, paddingLeft: 20}}>
        Facilities
      </Text>

      <View style={{flexDirection: 'row', padding: 10}}>
        <FilterCard label="2bhk" />
        <FilterCard label="Family" />
        <FilterCard label="Couple" />
        <FilterCard label="Single" />
      </View>
    </View>
  );
};
export default FilterScreen;
