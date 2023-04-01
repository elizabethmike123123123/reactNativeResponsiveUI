import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, screenSize} from '../global/Constants';
import nointernet from '../assets/nointernet/nointernet.png';

const NoInternet = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.red.select}}>
      <Image
        source={nointernet}
        style={{
          width: screenSize.width,
          height: screenSize.height,
          resizeMode: 'contain',
        }}
      />
      <Text>Wait For Internet.</Text>
    </View>
  );
};

export default NoInternet;

const styles = StyleSheet.create({});
