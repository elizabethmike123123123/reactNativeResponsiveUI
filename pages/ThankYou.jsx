import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {baseURL} from '../../config';
import {COLORS, fontSize, screenSize} from '../global/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThankYou = ({navigation, route}) => {
  const {id} = route.params;
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
      .get(`${baseURL}/order/${id}`, config)
      .then(res => setData(res.data.data))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <SafeAreaView>
      <View style={{height: screenSize.height}}>
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
            <TouchableOpacity onPress={() => navigation.navigate("OrderHistory")}>
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
              Order Summary
            </Text>
          </View>
          <View style={{width: '10%', alignItems: 'flex-end'}}>
            {/* <Ionicons name="search-outline" size={25} /> */}
          </View>
        </View>
        <ScrollView style={{padding: 20, paddingTop: 5}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', gap: 5}}>
              <Text
                style={{
                  fontSize: fontSize.size15,
                  fontWeight: '600',
                  marginTop: 10,
                  color: 'black',
                }}>
                Order No.
              </Text>
              <Text
                style={{
                  fontSize: fontSize.size15,
                  // fontWeight: '600',
                  marginTop: 10,
                  color: 'black',
                }}>
                : #{data.orderId}
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5}}>
              <Text
                style={{
                  fontSize: fontSize.size15,
                  fontWeight: '600',
                  marginTop: 10,
                  color: 'black',
                }}>
                Date
              </Text>
              <Text
                style={{
                  fontSize: fontSize.size15,
                  // fontWeight: '600',
                  marginTop: 10,
                  color: 'black',
                }}>
                : {new Date(data.createdAt).toDateString()}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', gap: 5}}>
            <Text
              style={{
                fontSize: fontSize.size15,
                fontWeight: '600',
                marginTop: 10,
                color: 'black',
              }}>
              Payment.
            </Text>
            <Text
              style={{
                fontSize: fontSize.size15,
                // fontWeight: '600',
                marginTop: 10,
                color: 'black',
              }}>
              : {data.paymentMethod}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              maxWidth: screenSize.width,
            }}>
            <Text
              style={{
                fontSize: fontSize.size15,
                fontWeight: '600',
                marginTop: 10,
                color: 'black',
              }}>
              Address. :
            </Text>
            <Text
              style={{
                fontSize: fontSize.size15,
                // fontWeight: '600',
                marginTop: 10,
                color: 'black',
                flexWrap: 'wrap',
                width: '80%',
              }}>
              {data?.orderdBy?.address}
            </Text>
          </View>
          <View
            style={{
              marginTop: 15,
              borderTopColor: '#33333355',
              borderTopWidth: 0.5,
            }}
          />
          <Text
            style={{
              fontSize: fontSize.size15,
              fontWeight: '600',
              marginTop: 10,
              color: 'black',
            }}>
            Order Items
          </Text>
          <View style={{marginTop: 15}} />
          {data?.items?.map((item, index) => (
            <View
              style={{flexDirection: 'row', gap: 10, marginVertical: 10}}
              key={index}>
              <Image
                source={{uri: item.images[0]}}
                style={{
                  width: 70,
                  height: 70,
                  resizeMode: 'contain',
                  borderRadius: 10,
                }}
              />
              <View style={{justifyContent: 'center', gap: 3}}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: fontSize.size14,
                    color: 'black',
                  }}>
                  {item?.title}
                </Text>
                <Text
                  style={{
                    color: 'black',
                  }}>
                  {item?.category_id?.name}
                </Text>
                {/* <View style={{flexDirection: 'row', gap: 3}}>
                  <Ionicons name="star" color="#00000033" />
                  <Ionicons name="star" color="#00000033" />
                  <Ionicons name="star" color="#00000033" />
                  <Ionicons name="star" color="#00000033" />
                </View> */}
                <Text style={{color: COLORS.red.main}}>
                  ₹ {item.price} x {item.qty}
                </Text>
              </View>
            </View>
          ))}
          <View>
            <Text
              style={{
                fontSize: fontSize.size15,
                fontWeight: '600',
                marginTop: 10,
                color: 'black',
              }}>
              Note
            </Text>

            <Text
              style={{
                fontSize: fontSize.size15,
                fontWeight: '600',
                marginTop: 10,
                color: 'black',
              }}>
              {data?.deliveryInstructions}
            </Text>

            <Text
              style={{
                marginTop: 20,
                fontWeight: '600',
                fontSize: fontSize.size15,
                color: 'black',
              }}>
              Bill Details
            </Text>
            <View
              style={{
                backgroundColor: COLORS.red.card,
                borderWidth: 1,
                borderColor: COLORS.red.singleCard,
                marginTop: 10,
                padding: 15,
                borderRadius: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: fontSize.size12,
                    fontWeight: '600',
                    color: 'black',
                  }}>
                  Item Details
                </Text>
                <Text
                  style={{
                    fontSize: fontSize.size12,
                    fontWeight: '600',
                    color: 'black',
                  }}>
                  Price
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#00000033',
                  marginVertical: 10,
                }}
              />
              {data?.items?.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                    }}>
                    {item.title} x {item.qty}
                  </Text>
                  <Text style={{color: COLORS.red.main}}>
                    ₹ {item.totalPrice.toFixed(2)}
                  </Text>
                </View>
              ))}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 5,
                }}>
                <Text
                  style={{
                    color: 'black',
                  }}>
                  Delivery Charge
                </Text>
                <Text style={{color: COLORS.red.main}}>
                  ₹ {data?.deliveryCharge}{' '}
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#00000033',
                  marginVertical: 10,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontWeight: '600', color: 'black'}}>
                  Total Pay
                </Text>
                <Text style={{color: COLORS.red.main}}>
                  ₹ {data?.totalPriceWithDeliveryCharge?.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginTop: 150}} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ThankYou;

const styles = StyleSheet.create({});
