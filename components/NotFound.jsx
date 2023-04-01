import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ImgLogo from '../assets/notfound.png';

const NotFound = () => {
  return (
    <View style={{flex: 1}}>
      <Image
        source={{ImgLogo}}
        style={{resizeMode: 'contain', width: 300, height: 300}}
      />
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({});
