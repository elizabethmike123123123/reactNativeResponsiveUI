import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {baseURL} from '../../../config';
import axios from 'axios';
import {COLORS, fontSize, screenSize} from '../../global/Constants';
import SettingIcons from '../../assets/setting/setting.png';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../../components/Loader';
import NotFound from '../../components/NotFound';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CategoryRestro = ({navigation, route, item}) => {
  const {cateId, name} = route.params;

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
      .get(`${baseURL}/restaurant/category/${cateId}`, config)
      .then(res => setData(res.data.data))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView>
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
            {name}
          </Text>
        </View>
        <View style={{width: '10%', alignItems: 'flex-end'}}></View>
      </View>
      <View style={{padding: 20, paddingTop: 5}}>
        {data.map((item, index) => (
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
                {item.description.slice(0, 35)} ...
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
    </SafeAreaView>
  );
};

export default CategoryRestro;

const styles = StyleSheet.create({});
