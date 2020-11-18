import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  // ScrollView,
  FlatList,
  Image,
} from 'react-native';
import Search from '../components/Search';
import {logout} from '../redux/actions/Auth';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {FoodCard} from '../components/FoodCard';
import {ScrollView} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';

import {StackActions} from '@react-navigation/native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const {height, width, fontScale} = Dimensions.get('window');
// var data = [];
const MainScreen = (props) => {
  const [data, setdata] = useState([]);
  const [user, setuser] = useState({});
  // var data = [];

  // const {item} = props
  useEffect(() => {
    var alldata = [];
    firestore()
      .collection('Property')
      .where('users.uid', '==', auth().currentUser.uid)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          console.log('data', doc.data());

          alldata.push({...doc.data()});
          setdata(alldata);
        });

        // data = [];
      });
  }, []);
  const handleLogout = () => {
    // const {navigation, logout} = props;
    // logout(navigation);
    firebase
      .auth()
      .signOut()
      .then(() => {
        AsyncStorage.removeItem('userData').then(() => {
          props.navigation.navigate('Login');
        });
      });
  };

  // const [data, setData] = useState([
  //   {
  //     rent: '5000',
  //     pic: require('../assets/property.png'),
  //     details: '1 Bhk Resdential for sale',
  //     id: '1',
  //   },
  //   {
  //     rent: '5000',
  //     pic: require('../assets/property.png'),
  //     details: '1 Bhk Resdential for sale',
  //     id: '2',
  //   },
  //   {
  //     rent: '5000',
  //     pic: require('../assets/property.png'),
  //     details: '1 Bhk Resdential for sale',
  //     id: '3',
  //   },
  //   {
  //     rent: '5000',
  //     pic: require('../assets/property.png'),
  //     details: '1 Bhk Resdential for sale',
  //     id: '4',
  //   },
  // ]);

  const SecondRoute = () => (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        // data={orderData2}
        // data={data}
        // style={{marginBottom:29}}
        horizontal
        // showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
        renderScrollComponent={(props) => <ScrollView {...props} />}
        renderItem={({item, separators, index}) => {
          return (
            <TouchableOpacity
              // onPress={() => this.props.navigation.navigate("OrderDetail", { itemData: item })}
              style={{
                paddingTop: 10,
                backgroundColor: '#FFF',
                marginTop: 40,
                width: '90%',
                alignSelf: 'center',
                borderRadius: 20,
                shadowOffset: {width: 0.5, height: 0.5},
                shadowOpacity: 0.2,
                elevation: 5,
              }}>
              <View
                style={{
                  marginLeft: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: 20,
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>ORDER#</Text>
                <TouchableOpacity
                  style={{
                    // backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 7,
                    borderRadius: 5,
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Availabale
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <OrderCard item={item} /> */}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );

  const FourthRoute = () => (
    <View style={{flex: 1}}>
      <FlatList
        // data={orderData2}
        // style={{marginBottom:29}}
        contentContainerStyle={{paddingBottom: 20}}
        renderItem={({item, separators, index}) => {
          return (
            <TouchableOpacity
              // onPress={() => this.props.navigation.navigate("OrderDetail", { itemData: item })}
              style={{
                paddingTop: 10,
                // backgroundColor: 'red',
                marginTop: 40,
                width: '90%',
                alignSelf: 'center',
                borderRadius: 20,
                shadowOffset: {width: 0.5, height: 0.5},
                shadowOpacity: 0.2,
                elevation: 5,
              }}>
              <View
                style={{
                  marginLeft: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: 20,
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>ORDER#</Text>
                <TouchableOpacity
                  style={{
                    // backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 7,
                    borderRadius: 5,
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Availabale
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <OrderCard item={item} /> */}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
  const {item} = props;
  const FirstRoute = () => (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{marginTop: 15, marginLeft: 10}}>
        <Text style={{color: '#A8A8A8', fontWeight: 'bold', fontSize: 16}}>
          1 BHK Apartments near you
        </Text>
        {/* <Text style={{marginTop: 50, color: '#000'}}>{item.title}</Text> */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({item}) => {
            console.log('dataaa', data);
            console.log('item', item);
            return (
              <View>
                <FoodCard>
                  {/* {props.imageUrl.uri ?} */}
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('Rent', {item})}>
                    <Image
                      // source={item.imageUrl}
                      source={{uri: item.imageUrl}}
                      style={{width: 200, height: 200, borderRadius: 10}}
                      resizeMode="cover"
                    />
                    <Text style={{padding: 5, fontWeight: 'bold'}}>
                      {item.price}
                    </Text>
                    <Text style={{padding: 5, color: '#C6C6C6'}}>
                      {item.title}
                    </Text>
                    <Text style={{color: '#C6C6C6', padding: 5}}>
                      apartment for sale
                    </Text>
                  </TouchableOpacity>
                </FoodCard>
              </View>
            );
          }}
        />
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'green',
            padding: 5,
            margin: 5,
            width: 140,
            borderRadius: 10,
            alignSelf: 'center',
            marginTop: 10,
          }}
          onPress={() => props.navigation.navigate('Add')}>
          <Text>Add property</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'green',
            padding: 5,
            margin: 5,
            width: 140,
            borderRadius: 10,
            alignSelf: 'center',
            marginTop: 10,
          }}
          onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const ThirdRoute = () => (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        // data={orderData1}
        // style={{marginBottom:29}}
        contentContainerStyle={{paddingBottom: 20}}
        renderItem={({item, separators, index}) => {
          return (
            <TouchableOpacity
              // onPress={() => this.props.navigation.navigate("OrderDetail", { itemData: item })}
              style={{
                paddingTop: 10,
                backgroundColor: '#FFF',
                marginTop: 40,
                width: '90%',
                alignSelf: 'center',
                borderRadius: 20,
                shadowOffset: {width: 0.5, height: 0.5},
                shadowOpacity: 0.2,
                elevation: 5,
              }}>
              <View
                style={{
                  marginLeft: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: 20,
                }}>
                {/* <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.orderNo}</Text> */}
                <TouchableOpacity
                  style={{
                    backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 7,
                    borderRadius: 5,
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Availabale
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <OrderCard item={item} /> */}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: 'black',
        height: 4,
        borderRadius: 2.5,
        // alignItems: 'center',
        justifyContent: 'center',
      }}
      style={{backgroundColor: '#fff', height: 50}}
      renderLabel={({route, focused, color}) => (
        <Text
          style={{
            color: '#000',
            // textTransform: 'uppercase',
            fontWeight: 'bold',
            margin: 8,
            fontSize: 12,
            width: 65,
            // backgroundColor: 'red',
            textAlign: 'center',
          }}>
          {route.title}
        </Text>
      )}
    />
  );
  // onPressSwipe=()=> {
  //     this.setState({ active: !this.state.active })
  // }
  const initialLayout = {width: Dimensions.get('window').width};
  const [routes] = useState([
    {key: 'first', title: 'Near Me'},
    {key: 'second', title: 'Explore city'},
    {key: 'third', title: 'Popular'},
    {key: 'fourth', title: 'Featured'},
  ]);

  const [index, setIndex] = useState(0);
  return (
    <View style={{flex: 1, backgroundColor: '#fff', padding: 10}}>
      <Search />

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};
const mapStateToProps = ({auth}) => {
  const {user} = auth;
  // const {city, area, description, title, bed, bath, price, contact} = property;

  return {
    user,
    // city,
    // area,
    // description,
    // title,
    // bed,
    // bath,
    // price,
    // contact,
  };
};
export default connect(mapStateToProps, {logout})(MainScreen);
