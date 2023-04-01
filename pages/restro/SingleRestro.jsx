import {
  Image,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {COLORS, fontSize, screenSize} from '../../global/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {UseContext} from '../../context/UseContext';
import ToastManager, {Toast} from 'toastify-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductCard from '../../components/ProductCard';
import axios from 'axios';
import {baseURL} from '../../../config';
import Loader from '../../components/Loader';
import CloseImage from '../../assets/close/close.png';

const SingleRestro = ({navigation, route}) => {
  const {restroId} = route.params;

  const {AddToCart, qtyTotal, RemoveFromCart, WishlistToggle, wishlist} =
    useContext(UseContext);

  const Cart = async item => {
    const msg = await AddToCart(item);
    if (msg.error) {
      Toast.error(msg.message.message);
    } else {
      Toast.success(msg.message);
    }
  };

  const RemoveCart = async item => {
    const msg = await RemoveFromCart(item);
    if (msg.error) {
      Toast.error(msg.message.message);
    } else {
      Toast.success(msg.message);
    }
  };

  const Wishlist = async item => {
    const msg = await WishlistToggle(item);
    if (msg.error) {
      Toast.error(msg.message.message);
    } else {
      Toast.success(msg.message);
    }
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const token = await AsyncStorage.getItem('userToken');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`${baseURL}/restaurant/${restroId}`, config)
      .then(res => setData(res.data.data))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  const [heart, setHeart] = useState(false);

  useEffect(() => {
    if (wishlist && data.restaurant) {
      var a = wishlist.filter(val => val._id == data.restaurant._id);
      if (a.length == 1) {
        setHeart(true);
      } else {
        setHeart(false);
      }
    }
  }, [wishlist, data]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <SafeAreaView style={{flex: 1}}>
      <ToastManager
        width={screenSize.width - 50}
        height={50}
        duration={3000}
        positionValue={Platform.OS === 'android' ? 0 : 50}
      />
      <View
        style={{
          padding: 20,
          paddingTop: 5,
          maxWidth: screenSize.width,
          maxHeight: screenSize.height,
        }}>
        <View
          style={{
            flexDirection: 'row',
            maxWidth: screenSize.width,
            alignItems: 'center',
            height: Platform.OS === 'ios' ? 30 : 50,
          }}>
          <View style={{width: '10%', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-sharp" size={28} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center', flex: 1}}>
            <Text
              style={{
                fontSize: fontSize.size22,
                fontWeight: '400',
                color: 'black',
              }}>
              Restaurant
              {/* {data.restaurant.name} */}
            </Text>
          </View>
          <View style={{width: '10%', alignItems: 'flex-end'}}>
            {/* <Ionicons name="search-outline" size={25} color="black" /> */}
          </View>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}>
          {/* Header Card */}
          <View
            style={{
              backgroundColor: COLORS.red.card,
              minHeight: 60,
              marginTop: 20,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: COLORS.red.select,
              padding: 10,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  gap: 5,
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: fontSize.size16,
                    color: 'black',
                  }}>
                  {data?.restaurant?.name}
                </Text>
                <Text
                  style={{
                    fontSize: fontSize.size12,
                    fontWeight: '400',
                    color: 'black',
                  }}>
                  <Ionicons name="star" style={{color: '#3F9E4B'}} />
                  {data?.restaurant?.averageRating} Ratings
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: fontSize.size12,
                      fontWeight: '400',
                      color: 'black',
                    }}>
                    {data?.restaurant?.category_id[0]?.name}
                  </Text>
                  {/* <Entypo name="dot-single" size={15} color="black" />
                  <Text
                    style={{
                      fontSize: fontSize.size12,
                      fontWeight: '600',
                      color: 'black',
                    }}>
                    ₹ 400 for two
                  </Text> */}
                </View>
              </View>
              <View style={{flexDirection: 'row', gap: 15}}>
                {/* <TouchableOpacity
                  onPress={() => navigation.navigate('Wishlist')}>
                  <Ionicons
                    name="share-social-outline"
                    size={20}
                    color="black"
                  />
                </TouchableOpacity> */}
                {/* <TouchableOpacity onPress={() => Wishlist(data.restaurant)}>
                  <Ionicons
                    name={heart ? 'heart' : 'heart-outline'}
                    size={20}
                    color={COLORS.red.main}
                  />
                </TouchableOpacity> */}
              </View>
            </View>
            {/* <View style={{borderBottomWidth: 1, borderColor: '#0000001A'}} /> */}
            {/* <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  color: COLORS.red.main,
                  fontWeight: '600',
                  fontSize: fontSize.size12,
                }}>
                <FontAwesome5 name="truck" />
                {data?.restaurant?.distanceInKm} kms
              </Text>
              <Text
                style={{
                  color: COLORS.red.main,
                  fontWeight: '600',
                  fontSize: fontSize.size12,
                }}>
                ₹ 15 Delivery Charges
              </Text>
            </View> */}
          </View>

          {data?.restaurant?.restaurantStatus ? (
            <View>
              {/* Product Listing */}
              <Text
                style={{
                  marginVertical: 20,
                  fontWeight: '600',
                  fontSize: fontSize.size16,
                  color: 'black',
                }}>
                Recommended ({data?.menu?.length})
              </Text>
              <View style={{}}>
                {data.menu.map((item, index) => (
                  <ProductCard
                    item={item}
                    key={index}
                    Cart={Cart}
                    navigation={navigation}
                    RemovCart={RemoveCart}
                  />
                ))}
              </View>
              <View style={{height: 120}} />
            </View>
          ) : (
            <View style={{flex: 1, marginTop: 100}}>
              <Image
                source={CloseImage}
                style={{
                  maxWidth: screenSize.width,
                  height: 300,
                  resizeMode: 'contain',
                }}
              />
            </View>
          )}
        </ScrollView>
      </View>

      {/* Cart Bottom View */}
      {qtyTotal.qty !== 0 && (
        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom:
              Platform.OS === 'ios'
                ? screenSize.height - screenSize.height + 60
                : screenSize.height - screenSize.height + 60,
            zIndex: 99,
            padding: 20,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <View
              style={{
                backgroundColor: COLORS.red.main,
                height: 52,
                borderRadius: 10,
                shadowColor: '#282828ff',
                shadowOffset: {width: -2, height: 4},
                shadowOpacity: 0.4,
                shadowRadius: 10,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 15,
              }}>
              <View
                style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: fontSize.size16,
                    fontWeight: '600',
                  }}>
                  {qtyTotal.qty} Item
                </Text>
                <View
                  style={{
                    borderLeftWidth: 1,
                    borderColor: COLORS.white,
                    height: 22,
                  }}
                />
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: fontSize.size16,
                    fontWeight: '600',
                  }}>
                  ₹ {qtyTotal.total.toFixed(2)}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: fontSize.size16,
                  fontWeight: '600',
                  color: COLORS.white,
                }}>
                View Cart
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SingleRestro;

const styles = StyleSheet.create({});
