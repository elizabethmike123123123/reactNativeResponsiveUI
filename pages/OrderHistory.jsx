import {
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {COLORS, fontSize, screenSize} from '../global/Constants';
import {baseURL} from '../../config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OrderHistory = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);

    const token = await AsyncStorage.getItem('userToken');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`${baseURL}/order/customer?skip=1?limit=1`, config)
      .then(res => setData(res.data.data))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

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
      <View
        style={{
          flexDirection: 'row',
          maxWidth: screenSize.width,
          alignItems: 'center',
          height: Platform.OS === 'ios' ? 30 : 50,
          margin: 20,
          marginTop: 5,
          marginBottom: 10,
        }}>
        <View style={{width: '10%', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
            Orders History
          </Text>
        </View>
        <View style={{width: '10%', alignItems: 'flex-end'}}>
          {/* <Ionicons name="search-outline" size={25} /> */}
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{padding: 20, paddingTop: 5, flex: 1}}>
        {data?.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate('ThankYou', {
                id: item._id,
              })
            }>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <View
                  style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: fontSize.size20,
                      color: 'black',
                    }}>
                    # {item.orderId}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: fontSize.size15,
                      color: 'black',
                    }}>
                    {item.orderRestaurant.name}
                  </Text>
                </View>

                <Text
                  style={{
                    color: 'black',
                  }}>
                  {new Date(item.orderDate).toDateString()}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: fontSize.size15,
                    color: COLORS.red.main,
                  }}>
                  ₹ {item.totalPriceWithDeliveryCharge}
                </Text>
                <Text style={{fontSize: fontSize.size12, color: 'black'}}>
                  {item.orderStatus}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderTopColor: '#03030320',
                borderTopWidth: 1,
                marginVertical: 10,
              }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({});
