import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {COLORS, fontSize} from '../global/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {UseContext} from '../context/UseContext';
import Loader from './Loader';
import {BottomSheet} from '@rneui/themed';
import Entypo from 'react-native-vector-icons/Entypo';

const ProductCard = ({navigation, item, Cart, RemovCart}) => {
  const {cart: CartItem} = useContext(UseContext);

  const [loading, setLoading] = useState(true);
  const [ifExist, setIfExist] = useState(false);
  const [existCount, setExistCount] = useState(0);

  useEffect(() => {
    if (CartItem !== null) {
      const count = CartItem.filter(val => val._id === item._id);

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
  }, [CartItem, item]);

  const [isVisible, setIsVisible] = useState(false);

  return loading ? (
    <Loader />
  ) : (
    <View>
      <BottomSheet
        modalProps={{}}
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}>
        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            overflow: 'hidden',
          }}>
          <TouchableOpacity
            style={{position: 'absolute', right: 20, top: 20, zIndex: 2}}
            onPress={() => setIsVisible(false)}>
            <Entypo name="circle-with-cross" size={25} color="white" />
          </TouchableOpacity>
          <Image
            source={{uri: item?.images[0]}}
            style={{
              width: '100%',
              height: 200,
              resizeMode: 'cover',
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
          />
          <View
            style={{
              padding: 20,
              paddingBottom: 0,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                justifyContent: 'center',
                gap: 3,
                maxWidth: '55%',
                flexWrap: 'nowrap',
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: fontSize.size20,
                  color: 'black',
                  marginBottom: 5,
                }}>
                {item.title}
              </Text>
              {item?.category_id?.name !== undefined && (
                <Text
                  style={{
                    color: 'black',
                    marginBottom: 5,
                  }}>
                  {item?.category_id?.name}
                </Text>
              )}
              {/* <View style={{flexDirection: 'row', gap: 3}}>
                <Ionicons name="star" color="#00000033" />
                <Ionicons name="star" color="#00000033" />
                <Ionicons name="star" color="#00000033" />
                <Ionicons name="star" color="#00000033" />
              </View> */}
              <Text style={{color: COLORS.red.main}}>₹ {item.price}</Text>
            </View>
            <View style={{gap: 10}}>
              {item?.availability ? (
                <View style={{gap: 10}}>
                  {ifExist ? (
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
                        flexDirection: 'row',
                      }}>
                      <TouchableOpacity onPress={() => RemovCart(item)}>
                        <Text
                          style={{
                            color: 'black',
                            width: 30,
                            textAlign: 'center',
                          }}>
                          -
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          color: 'black',
                          width: 30,
                          textAlign: 'center',
                        }}>
                        {existCount}
                      </Text>
                      <TouchableOpacity onPress={() => Cart(item)}>
                        <Text
                          style={{
                            color: 'black',
                            width: 30,
                            textAlign: 'center',
                          }}>
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => Cart(item)}
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
                        fontSize: fontSize.size13,
                      }}>
                      In Stock
                    </Text>
                  </View>
                </View>
              ) : (
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
                      fontSize: fontSize.size13,
                    }}>
                    Out of Stock
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={{padding: 20, marginBottom: 20}}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: fontSize.size15,
                marginBottom: 10,
              }}>
              Description
            </Text>
            <Text>{item?.description}</Text>
          </View>
        </View>
      </BottomSheet>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 7,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => setIsVisible(!isVisible)}
          style={{flexDirection: 'row', gap: 10}}>
          <Image
            source={{uri: item?.images[0]}}
            style={{
              width: 70,
              height: 70,
              resizeMode: 'cover',
              borderRadius: 10,
            }}
          />
          <View
            style={{
              justifyContent: 'center',
              gap: 3,
              maxWidth: '55%',
              flexWrap: 'nowrap',
            }}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: fontSize.size14,
                color: 'black',
              }}>
              {item.title}
            </Text>
            {item?.category_id?.name !== undefined && (
              <Text
                style={{
                  color: 'black',
                }}>
                {item?.category_id?.name}
              </Text>
            )}
            {/* <View style={{flexDirection: 'row', gap: 3}}>
              <Ionicons name="star" color="#00000033" />
              <Ionicons name="star" color="#00000033" />
              <Ionicons name="star" color="#00000033" />
              <Ionicons name="star" color="#00000033" />
            </View> */}
            <Text style={{color: COLORS.red.main}}>₹ {item.price}</Text>
          </View>
        </TouchableOpacity>
        <View style={{gap: 10}}>
          {item?.availability ? (
            <View style={{gap: 10}}>
              {ifExist ? (
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
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity onPress={() => RemovCart(item)}>
                    <Text
                      style={{
                        color: 'black',
                        width: 30,
                        textAlign: 'center',
                      }}>
                      -
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: 'black',
                      width: 30,
                      textAlign: 'center',
                    }}>
                    {existCount}
                  </Text>
                  <TouchableOpacity onPress={() => Cart(item)}>
                    <Text
                      style={{
                        color: 'black',
                        width: 30,
                        textAlign: 'center',
                      }}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => Cart(item)}
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
            </View>
          ) : (
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
                  fontSize: fontSize.size13,
                }}>
                Out of Stock
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({});
