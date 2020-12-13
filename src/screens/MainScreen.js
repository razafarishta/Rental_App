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
import {SearchBar} from 'react-native-elements';
import Search from '../components/Search';
import {logout} from '../redux/actions/Auth';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {FoodCard} from '../components/FoodCard';
import {ScrollView} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {StackActions} from '@react-navigation/native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const {height, width, fontScale} = Dimensions.get('window');
// var data = [];
const MainScreen = (props) => {
  const [data, setdata] = useState([]);
  const [search, setsearch] = useState('');
  const [filterData, setfilterData] = useState([]);
  const [user, setuser] = useState({});
  const [searchValue, setsearchValue] = useState('');
  var arrayholder = [];

  useEffect(() => {
    var alldata = [];
    firestore()
      .collection('Property')
      // .where('users.uid', '==', auth().currentUser.uid)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          console.log('data', doc.data());

          alldata.push({...doc.data()});

          setdata(alldata);
        });

        alldata = [];
      });
  }, []);

  const Favourite = (item) => {
    console.log('favo item', item);
    firestore()
      .collection('Favourite')
      .doc(auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        // console.log('favo snap', snapshot);
        // if (snapshot.exists) {
        //   firestore()
        //     .collection('Favourite')
        //     .doc(auth().currentUser.uid)
        //     .update({
        //       favourite: firestore.FieldValue.arrayUnion(item.users.docId),
        //     })
        //     .then(() => {
        //       alert('This post is favourite');
        //     });
        // } else {
        firestore()
          .collection('Favourite')
          .doc(auth().currentUser.uid)
          .set({
            favourite: firestore.FieldValue.arrayUnion(item.users.docId),
          })
          .then(() => {
            alert('This post is Bookmarker');
          });
        // }
      });
  };
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

  const updateSearch = (search) => {
    setsearch({search});
    if (search === '') {
      setdata({data});
    } else {
      let List = data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      );

      setdata({data: List});
    }
  };
  const SecondRoute = () => (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 10}}>
        <Text style={{color: '#A8A8A8', fontWeight: 'bold', fontSize: 16}}>
          Rent apartments near you
        </Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({item}) => {
            // console.log('dataaa', data);
            // console.log('item', item);
            return (
              <View>
                {item.rent ? (
                  <FoodCard>
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate('Rent', {item})}>
                      <Image
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
                        apartment for rent
                      </Text>
                    </TouchableOpacity>
                  </FoodCard>
                ) : null}
              </View>
            );
          }}
        />
      </View>
    </View>
  );

  const FourthRoute = () => <View style={{flex: 1}}></View>;
  const {item} = props;
  const FirstRoute = () => (
    <ScrollView
      style={{flex: 1, backgroundColor: '#fff'}}
      showsVerticalScrollIndicator={false}>
      <View style={{marginTop: 15, marginLeft: 5}}>
        <Text style={{color: '#A8A8A8', fontWeight: 'bold', fontSize: 16}}>
          1 BHK Apartments near you
        </Text>
        {/* <Text style={{marginTop: 50, color: '#000'}}>{item.title}</Text> */}
        {/* {item.sell == true ? ( */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}}
          renderScrollComponent={(props) => <ScrollView {...props} />}
          data={data}
          style={{}}
          renderItem={({item}) => {
            // console.log('dataaa', data);
            // console.log('item', item);
            return (
              <View>
                {item.sell ? (
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
                      {/* {item.sell == true ? ( */}
                      <Text style={{color: '#C6C6C6', padding: 5}}>
                        apartment for sale
                      </Text>
                      <TouchableOpacity>
                        <Ionicons
                          name="heart-outline"
                          size={30}
                          onPress={() => Favourite(item)}
                        />
                      </TouchableOpacity>
                      {/* ) : ( */}
                      {/* <Text style={{color: '#C6C6C6', padding: 5}}>
                          apartment for rent
                        </Text> */}
                      {/* )} */}
                    </TouchableOpacity>
                  </FoodCard>
                ) : null}
              </View>
            );
          }}
        />
        {/* ) : ( */}

        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
            padding: 10,
            margin: 5,
            width: 140,
            borderRadius: 10,
            alignSelf: 'center',
            marginTop: 50,
          }}
          onPress={() => props.navigation.navigate('Add')}>
          <Text style={{fontWeight: 'bold', fontSize: 16, color: '#fff'}}>
            Add property
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
            padding: 10,
            margin: 5,
            width: 140,
            borderRadius: 10,
            alignSelf: 'center',
            marginTop: 50,
          }}
          onPress={() => props.navigation.navigate('favourites')}>
          <Text style={{fontWeight: 'bold', fontSize: 16, color: '#fff'}}>
            Favourite
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
            padding: 10,
            margin: 5,
            width: 140,
            borderRadius: 10,
            alignSelf: 'center',
            marginTop: 10,
          }}
          onPress={handleLogout}>
          <Text style={{fontWeight: 'bold', fontSize: 16, color: '#fff'}}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const ThirdRoute = () => (
    <View style={{flex: 1, backgroundColor: 'white'}}></View>
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
      <Search onChangeText={updateSearch} value={search} />

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

  return {
    user,
  };
};
export default connect(mapStateToProps, {logout})(MainScreen);
