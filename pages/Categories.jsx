import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, fontSize, screenSize} from '../global/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import {baseURL} from '../../config';
import {Image} from 'react-native';
import Loader from '../components/Loader';
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
      .get(`${baseURL}/category?skip=1&limit=100`, config)
      .then(res => setData(res.data.data))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <SafeAreaView style={{maxWidth: screenSize.width, flex: 1}}>
      <View
        style={{
          padding: 20,
          paddingTop: 10,
          flexDirection: 'row',
          maxWidth: screenSize.width,
          alignItems: 'center',
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
            Categories
          </Text>
        </View>
        <View style={{width: '10%', alignItems: 'flex-end'}}></View>
      </View>
      <ScrollView style={{padding: 20, paddingTop: 5, flex: 1}}>
        {data.map((item, index) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginBottom: 10,
              alignItems: 'center',
              gap: 10,
            }}
            key={index}
            onPress={() => {
              navigation.navigate('CategoryRestro', {
                cateId: item._id,
                name: item.name,
              });
            }}>
            <View
              style={{
                backgroundColor: COLORS.red.select,
                width: 70,
                height: 70,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: item.image}}
                style={{width: 60, height: 60, resizeMode: 'contain'}}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: fontSize.size14,
                  textAlign: 'center',
                  marginTop: 5,
                  color: 'black',
                }}>
                {item.name}
              </Text>
              <Entypo name="chevron-right" size={25} color="black" />
            </View>
          </TouchableOpacity>
        ))}
        <View style={{height: 100}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Categories;

const styles = StyleSheet.create({});
