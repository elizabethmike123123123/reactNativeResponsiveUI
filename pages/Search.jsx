import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, fontSize, screenSize} from '../global/Constants';
import CommonHeader from '../components/CommonHeader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseURL} from '../../config';
import {HStack, Image, Skeleton, VStack} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

const Search = ({navigation}) => {
  const [filterData, setFilterData] = useState([]);

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
      .get(`${baseURL}/restaurant`, config)
      .then(res => setData(res.data.data))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {}, []);

  return (
    <SafeAreaView>
      <View style={{flex: 1, padding: 20, paddingTop: 5}}>
        <CommonHeader />
        <View style={styles.input}>
          <Icon name="search" size={20} style={{color: COLORS.red.main}} />

          <TextInput
            placeholder="Enter Restaurants & Food Items."
            style={{
              flex: 1,
              color: 'black',
              fontWeight: '400',
              fontSize: 15,
            }}
            placeholderTextColor="#999"
          />
        </View>
        <View style={{marginTop: 15, borderWidth: 1}}>
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
                        20 km
                      </Text>
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    marginVertical: 20,
    marginTop: Platform.OS == 'ios' ? 10 : 5,
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
