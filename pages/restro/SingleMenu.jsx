import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import ToastManager, {Toast} from 'toastify-react-native';
import {COLORS, fontSize, screenSize} from '../../global/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pizza from '../../assets/pizza/pizza_single.png';
import {UseContext} from '../../context/UseContext';
import Button from '../../components/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SingleMenu = ({navigation}) => {
  const {cart: CartItem} = useContext(UseContext);

  const [loading, setLoading] = useState(true);
  const [ifExist, setIfExist] = useState(false);
  const [existCount, setExistCount] = useState(0);

  useEffect(() => {
    if (CartItem !== null) {
      const count = CartItem.filter(val => val._id === '_1');

      if (count.length !== 0) {
        setIfExist(true);
        setExistCount(count[0].qty);
        setLoading(false);
      } else {
        setIfExist(false);
        setLoading(false);
      }
    }
    setLoading(false);
  }, [CartItem]);

  const {AddToCart, qtyTotal, RemoveFromCart} = useContext(UseContext);

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

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
      <ToastManager width={screenSize.width - 50} height={50} duration={3000} />
      <View style={{}}>
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
                color: 'black',
              }}>
              View Item
            </Text>
          </View>
          <View style={{width: '10%', alignItems: 'flex-end'}}></View>
        </View>

        <View
          style={{
            height: 250,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.red.singleCard,
          }}>
          <Image source={Pizza} />
        </View>
        <View style={{padding: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  fontSize: fontSize.size20,
                  fontWeight: '600',
                  color: 'black',
                }}>
                Neapolitan Pizza
              </Text>
              <Text
                style={{
                  fontSize: fontSize.size18,
                  fontWeight: '600',
                  marginTop: 5,
                  color: '#00000099',
                }}>
                La Pino’z
              </Text>

              <View style={{flexDirection: 'row', marginTop: 5, gap: 10}}>
                <Text
                  style={{
                    fontSize: fontSize.size22,
                    fontWeight: '600',
                    textDecorationLine: 'line-through',
                    textDecorationStyle: 'solid',
                    color: '#00000080',
                    textDecorationColor: COLORS.red.main,
                  }}>
                  ₹189
                </Text>
                <Text
                  style={{
                    fontSize: fontSize.size22,
                    fontWeight: '600',
                    color: 'red',
                  }}>
                  ₹179
                </Text>
              </View>

              <View style={{flexDirection: 'row', gap: 10, marginTop: 5}}>
                <AntDesign name="star" color="#00000033" size={15} />
                <AntDesign name="star" color="#00000033" size={15} />
                <AntDesign name="star" color="#00000033" size={15} />
                <AntDesign name="star" color="#00000033" size={15} />
              </View>
            </View>
            <View style={{justifyContent: 'space-between'}}>
              <View style={{alignItems: 'flex-end'}}>
                {/* <TouchableOpacity>
                  <AntDesign name="hearto" size={20} color="black" />
                </TouchableOpacity> */}
              </View>
              <View style={{gap: 10}}>
                {ifExist ? (
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: COLORS.red.main,
                      width: 90,
                      height: 30,
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      borderRadius: 5,
                      backgroundColor: COLORS.red.select,
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity onPress={() => RemovCart(item)}>
                      <Text
                        style={{
                          color: 'black',
                        }}>
                        -
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: 'black',
                      }}>
                      {existCount}
                    </Text>
                    <TouchableOpacity onPress={() => Cart(item)}>
                      <Text
                        style={{
                          color: 'black',
                        }}>
                        +
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    // onPress={() => Cart(item)}
                    style={{
                      borderWidth: 1,
                      borderColor: COLORS.red.main,
                      width: 90,
                      height: 30,
          
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 5,
                      backgroundColor: COLORS.red.select,
                    }}>
                    <Text
                      style={{
                        color: 'black',
                      }}>
                      Add
                    </Text>
                  </TouchableOpacity>
                )}
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: COLORS.red.main,
                    width: 90,
                    height: 30,        
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    backgroundColor: COLORS.red.select,
                  }}>
                  <Text
                    style={{
                      fontSize: fontSize.size10,
                      fontWeight: '600',
                      color: 'black',
                      fontSize : fontSize.size13
                    }}>
                    In Stock
                  </Text>
                </View>
                {/* <View
                style={{
                  borderWidth: 1,
                  borderColor: '#808080',
                  width: 70,
                  height: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  backgroundColor: '#80808033',
                }}>
                <Text style={{fontSize: fontSize.size10, fontWeight: '600'}}>
                  Out Stock
                </Text>
              </View> */}
              </View>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: '#00000033',
              borderBottomWidth: 0.5,
              marginVertical: 20,
            }}
          />
          <Text
            style={{
              fontSize: fontSize.size20,
              fontWeight: 600,
              color: 'black',
            }}>
            Description
          </Text>
          <View>
            <Text
              style={{
                fontSize: fontSize.size12,
                fontWeight: '600',
                color: '#00000099',
                marginTop: 10,
                textAlign: 'justify',
                lineHeight: 16.34,
              }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Text>
          </View>
        </View>
      </View>
      <View style={{marginHorizontal: 20, marginBottom: 20}}>
        <Button title="Add to Cart" />
      </View>
    </SafeAreaView>
  );
};

export default SingleMenu;

const styles = StyleSheet.create({});
