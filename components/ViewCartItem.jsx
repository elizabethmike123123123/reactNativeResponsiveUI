import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {COLORS, fontSize} from '../global/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {UseContext} from '../context/UseContext';

const ViewCartItem = ({navigation, item, Cart, RemovCart}) => {
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

  return loading ? (
    <Text>Loading...</Text>
  ) : (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 7,
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
      }}>
      <View style={{flexDirection: 'row', gap: 10, flex: 2}}>
        <Image
          source={{uri: item.images[0]}}
          style={{
            width: 70,
            height: 70,
            resizeMode: 'cover',
            borderRadius: 10,
          }}
        />
        <View style={{justifyContent: 'center', gap: 3, flexWrap: 'nowrap'}}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: fontSize.size14,
              color: 'black',
              width: '60%',
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
          <Text style={{color: COLORS.red.main}}>₹ {item.price}</Text>
        </View>
      </View>
      <View style={{flex: 1}}>
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
    </View>
  );
};

export default ViewCartItem;

const styles = StyleSheet.create({});
