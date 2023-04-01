import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {baseURL} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ImageSlider} from 'react-native-image-slider-banner';

const Slider = () => {
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
      .get(`${baseURL}/slider`, config)
      .then(res => setData(res.data.data))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    ''
  ) : (
    <View style={{position: 'relative'}}>
      <ImageSlider
        data={[
          {
            img: data[0]?.image,
          },
          {
            img: data[1]?.image,
          },
          {
            img: data[2]?.image,
          },
        ]}
        caroselImageStyle={{
          resizeMode: 'contain',
          height: 150,
          borderRadius: 10,
        }}
        indicatorContainerStyle={{bottom: -10}}
        autoPlay={true}
        activeIndicatorStyle={{backgroundColor: '#fff', width: 10, height: 10}}
        inActiveIndicatorStyle={{backgroundColor: '#FFFFFF80'}}
      />
      {/* <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        data={data}
        onScroll={onScroll}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <View style={{borderRadius: 20}}>
            <Image
              source={{uri: item.image}}
              resizeMode="cover"
              style={{
                width: screenSize.width - 40,
                height: 180,
                borderRadius: 20,
              }}
            />
          </View>
        )}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        {slides.map((item, index) => (
          <View
          key={index}
            style={{
              width: 12,
              height: 12,
              backgroundColor:
                currentIndex == index ? COLORS.red.main : '#FFFFFF77',
              borderRadius: 50,
            }}></View>
        ))}
      </View> */}
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({});
