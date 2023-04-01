import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {COLORS, fontSize, screenSize} from '../../global/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {UseContext} from '../../context/UseContext';
import ToastManager, {Toast} from 'toastify-react-native';
import ViewCartItem from '../../components/ViewCartItem';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Button from '../../components/Button';
import {BottomSheet} from '@rneui/themed';
import Entypo from 'react-native-vector-icons/Entypo';
import {AuthContext} from '../../context/AuthContext';
import {baseURL} from '../../../config';
import axios from 'axios';
import CartImage from '../../assets/cart.jpeg';
import Loader from '../../components/Loader';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const Cart = ({navigation}) => {
  const {
    OrderPlace,
    AddToCart,
    RemoveFromCart,
    cart: CartItem,
    note,
    setNote,
    deliveryCharges,
  } = useContext(UseContext);

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

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    CartItem?.forEach(element => {
      total = total + element.totalPrice;
    });
    total = total.toFixed(2);
    setOrderValue(total);
    total = parseFloat(total) + deliveryCharges;
    setTotalPrice(total);
  }, [CartItem]);

  const [orderValue, setOrderValue] = useState(0);

  const [loading, setLoading] = useState(false);

  const [loadingModal, setLoadingModal] = useState(false);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const {userToken} = useContext(AuthContext);

  const [address, setAddress] = useState({
    flatNo: '',
    aprt: '',
    city: 'Tharad, Gujarat 385565',
  });

  const [geoLocation, setGeoLocation] = useState(null);

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        // Proceed with accessing location
        // ...

        Geolocation.getCurrentPosition(
          position => {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            setGeoLocation({latitude, longitude});
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const getLocation = () => {
    requestLocationPermission();
  };

  useEffect(() => {
    getLocation();
  }, []);

  const addAddress = async () => {
    getLocation();
    const details = address?.flatNo + ',' + address?.aprt + ',' + address.city;

    setLoadingModal(true);

    var config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${baseURL}/auth/address`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({address: details, geoLocation: geoLocation}),
    };

    await axios(config)
      .then(res => {
        if (res.data.error == false) {
          setModal(false);
          setLoadingModal(false);
        }
      })
      .catch(error => {
        Alert.alert('Invalid Address');
        setLoadingModal(false);
      });
  };


  const order = async () => {
    setBtnLoading(true);
    const data = await OrderPlace(navigation);
    setLoading(data);
    setInterval(() => {
      setBtnLoading(data);
    }, 3000);
  };

  const [btnLoading, setBtnLoading] = useState(false);

  return loading ? (
    <Loader />
  ) : (
    <SafeAreaView>
      <BottomSheet
        modalProps={{}}
        isVisible={modal}
        onBackdropPress={() => setModal(false)}>
        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            minHeight: 400,
            padding: 20,
          }}>
          <TouchableOpacity
            style={{position: 'absolute', right: 20, top: 20, zIndex: 1}}
            onPress={() => setModal(false)}>
            <Entypo name="circle-with-cross" size={20} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: '700',
              fontSize: fontSize.size22,
              textAlign: 'center',
              color: 'black',
            }}>
            Change Address
          </Text>
          <View style={{marginTop: 20, flexDirection: 'column', gap: 20}}>
            <View style={styles.input}>
              <TextInput
                value={address.flatNo}
                onChangeText={e => setAddress({...address, flatNo: e})}
                placeholder="House / Flat / Block No."
                style={{
                  flex: 1,
                  color: 'black',
                  fontWeight: '400',
                  fontSize: 15,
                }}
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.input}>
              <TextInput
                value={address.aprt}
                onChangeText={e => setAddress({...address, aprt: e})}
                placeholder="Apartment / Road / Area"
                style={{
                  flex: 1,
                  color: 'black',
                  fontWeight: '400',
                  fontSize: 15,
                }}
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.input}>
              <TextInput
                editable={false}
                value="Tharad, Gujarat 385565"
                placeholder="Enter Your City"
                style={{
                  flex: 1,
                  color: 'black',
                  fontWeight: '400',
                  fontSize: 15,
                }}
                placeholderTextColor="#999"
              />
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <Button
              title="Add Address to Proceed"
              onPress={() => addAddress()}
              loading={loadingModal}
            />
          </View>
        </View>
      </BottomSheet>
      <ToastManager
        width={screenSize.width - 50}
        height={50}
        duration={3000}
        positionValue={Platform.OS === 'android' ? 0 : 50}
      />
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
              View Cart
            </Text>
          </View>
          <View style={{width: '10%', alignItems: 'flex-end'}}>
            {/* <Ionicons name="search-outline" size={25} /> */}
          </View>
        </View>
        {CartItem && CartItem?.length !== 0 ? (
          <ScrollView style={{padding: 20, paddingTop: 5}}>
            {CartItem?.map((item, index) => (
              <ViewCartItem
                item={item}
                key={index}
                Cart={Cart}
                navigation={navigation}
                RemovCart={RemoveCart}
              />
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
              <TextInput
                multiline={true}
                style={{
                  backgroundColor: COLORS.red.card,
                  borderWidth: 1,
                  borderColor: COLORS.red.singleCard,
                  borderBottomColor: COLORS.red.singleCard,
                  height: 60,
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 10,
                  color: 'black',
                }}
                value={note}
                onChangeText={setNote}
              />
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
                {CartItem?.map((item, index) => (
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
                      {item.title}
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
                    ₹ {deliveryCharges}
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
                    ₹ {totalPrice.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text
                style={{
                  marginTop: 20,
                  fontWeight: '600',
                  fontSize: fontSize.size15,
                  color: 'black',
                }}>
                Select Delivery Location
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
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                    }}>
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        maxHeight: 30,
                        maxHeight: 30,
                        backgroundColor: COLORS.red.location,
                        borderRadius: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <FontAwesome5
                        name="map-marker-alt"
                        size={16}
                        color={COLORS.red.main}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: fontSize.size16,
                        fontWeight: '600',
                        color: 'black',
                      }}>
                      Tharad
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => toggleModal()}
                    style={{
                      borderWidth: 1,
                      borderColor: COLORS.red.main,
                      width: 70,
                      height: 25,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 5,
                      backgroundColor: COLORS.red.select,
                    }}>
                    <Text
                      style={{
                        color: 'black',
                      }}>
                      Change
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{marginTop: 30}} />
            {parseInt(orderValue) > 50 ? (
              <Button
                title="Place Order"
                loading={btnLoading}
                onPress={() => order()}
              />
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: fontSize.size15,
                  color: COLORS.red.main,
                  fontWeight: '600',
                }}>
                You Must Required Cart Value More than 50 ₹
              </Text>
            )}
            <View style={{height: 150}} />
          </ScrollView>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: screenSize.height - 250,
              padding: 20,
            }}>
            <Image
              source={CartImage}
              style={{
                width: screenSize.width - 100,
                height: 300,
                resizeMode: 'contain',
              }}
            />
            <Text
              style={{
                fontWeight: '600',
                fontSize: fontSize.size18,
                color: 'black',
              }}>
              Good Food is Always Cooking
            </Text>
            <Text
              style={{
                fontSize: fontSize.size15,
                textAlign: 'center',
                marginVertical: 20,
                color: 'black',
              }}>
              Your Cart is empty. Add Something from the Menu
            </Text>
            <Button title="Home" onPress={() => navigation.navigate('Home')} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: COLORS.red.main,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 15,
  },
});
