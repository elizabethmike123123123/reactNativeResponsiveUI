import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Burger from '../assets/category/burger.png';
import Chinese from '../assets/category/chinese.png';
import Dosa from '../assets/category/dosa.png';
import Pizza from '../assets/category/pizza.png';
import Sandwich from '../assets/category/sandwich.png';
import {COLORS, fontSize} from '../global/Constants';
import axios from 'axios';
import {baseURL} from '../../config';
import {Skeleton, VStack} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Categories = ({navigation}) => {
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
      .get(`${baseURL}/category`, config)
      .then(res => setData(res.data.data))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{marginVertical: 15}}>
      {data.length == 0 ? (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          ItemSeparatorComponent={() => <View style={{width: 10}} />}
          renderItem={({item, index}) => (
            <VStack width={60} space={2} overflow="hidden">
              <Skeleton h="60" rounded="md" />
              <Skeleton.Text lines={1} />
            </VStack>
          )}
        />
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          ItemSeparatorComponent={() => <View style={{width: 10}} />}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate('CategoryRestro', {
                  cateId: item._id,
                  name: item.name,
                });
              }}
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: COLORS.red.select,
                  width: 60,
                  height: 60,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: item.image}}
                  style={{width: 50, height: 50, resizeMode: 'contain'}}
                />
              </View>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: fontSize.size10,
                  textAlign: 'center',
                  marginTop: 5,
                  color: 'black',
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({});
