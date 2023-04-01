import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS, fontSize, screenSize} from '../global/Constants';
import SettingIcons from '../assets/setting/setting.png';
import Pizza from '../assets/pizza/pizza.png';
import Entypo from 'react-native-vector-icons/Entypo';
import {BottomSheet} from '@rneui/themed';
import {baseURL} from '../../config';
import axios from 'axios';
import {HStack, Skeleton, VStack} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native';

const HomeRestro = ({navigation, search}) => {
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
      .get(`${baseURL}/restaurant?skip=1&limit=20000&search=${search}`, config)
      .then(res => setData(res.data.data))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, [search]);

  const [isVisible, setIsVisible] = useState(false);

  const [filter, setFilter] = useState('sort');

  return (
    <View style={{marginTop: 10, height: '100%'}}>
      <BottomSheet
        modalProps={{}}
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}>
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
            onPress={() => setIsVisible(false)}>
            <Entypo name="circle-with-cross" size={20} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: '700',
              fontSize: fontSize.size22,
              textAlign: 'center',
              color: 'black',
            }}>
            Filter
          </Text>
          <View
            style={{
              justifyContent: 'space-between',
              flex: 1,
              paddingBottom: 20,
            }}>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 10,
              }}>
              <TouchableOpacity
                onPress={() => setFilter('sort')}
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.red.main,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  width: Math.floor((screenSize.width - 60) / 3),
                  backgroundColor:
                    filter === 'sort' ? COLORS.red.select : 'transparent',
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: fontSize.size15,
                    color: 'black',
                  }}>
                  Sort
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setFilter('offers')}
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.red.main,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  width: Math.floor((screenSize.width - 60) / 3),
                  backgroundColor:
                    filter === 'offers' ? COLORS.red.select : 'transparent',
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: fontSize.size15,
                    color: 'black',
                  }}>
                  Offers
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setFilter('ratings')}
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.red.main,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  width: Math.floor((screenSize.width - 60) / 3),
                  backgroundColor:
                    filter === 'ratings' ? COLORS.red.select : 'transparent',
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: fontSize.size15,
                    color: 'black',
                  }}>
                  Ratings
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                onPress={() => setFilter('sort')}
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.red.main,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  width: Math.floor((screenSize.width - 100) / 2),
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: fontSize.size15,
                    color: 'black',
                  }}>
                  Clear All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setFilter('sort')}
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.red.main,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  width: Math.floor((screenSize.width - 100) / 2),
                  backgroundColor: COLORS.red.select,
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: fontSize.size15,

                    color: 'black',
                  }}>
                  Apply
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomSheet>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontWeight: '600',
            fontSize: fontSize.size15,
            color: 'black',
          }}>
          {data?.length} Restaurants
        </Text>
        {/* <TouchableOpacity onPress={() => setIsVisible(true)}>
          <Image
            source={SettingIcons}
            style={{width: 17, height: 17, resizeMode: 'contain'}}
          />
        </TouchableOpacity> */}
      </View>
      <View style={{marginTop: 15}}>
        {data.length == 0
          ? [
              [1, 2, 3, 4, 5, 6, 7].map((item , index) => (
                <HStack space={5} rounded="md" my={2} key={index}>
                  <Skeleton
                    flex="1"
                    h="70"
                    rounded="md"
                    startColor="coolGray.100"
                  />
                  <VStack flex="3" space="4" justifyContent="center">
                    <Skeleton.Text width={'50%'} />
                  </VStack>
                </HStack>
              )),
            ]
          : data.map((item, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SingleRestro', {
                    restroId: item._id,
                  })
                }
                key={item._id}
                style={{flexDirection: 'row', gap: 10, marginVertical: 7}}>
                <Image
                  source={{uri: item.images[0]}}
                  style={{
                    width: 70,
                    height: 70,
                    resizeMode: 'cover',
                    borderRadius: 10,
                  }}
                />
                <View style={{justifyContent: 'center', gap: 5}}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: fontSize.size14,
                      color: 'black',
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                    }}>
                    {item.description.slice(0, 60)}
                  </Text>
                  <Text
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      color: 'black',
                    }}>
                    Tharad
                    <Entypo name="dot-single" size={15} />
                    <Text style={{color: COLORS.red.main, fontWeight: '600'}}>
                      {item?.distanceInKm}
                    </Text>
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
      </View>
    </View>
  );
};

export default HomeRestro;

const styles = StyleSheet.create({});
