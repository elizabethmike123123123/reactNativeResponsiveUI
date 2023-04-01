import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {fontSize, screenSize} from '../global/Constants';
import {Avatar} from '@rneui/themed';
import User from '../assets/user.png';
import Logo from '../assets/logo/logo.png';

const CommonHeader = ({navigation}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        alignItems: 'center',
        height: Platform.OS === 'ios' ? 50 : 80,
      }}>
      <View>
        <Text
          style={{
            fontWeight: '600',
            fontSize: fontSize.size20,
            color: 'black',
          }}>
          Tharad
        </Text>
        <Text
          style={{
            fontWeight: '400',
            fontSize: fontSize.size13,
            color: 'black',
          }}>
          Tharad,Banaskantha, Gujarat 385565, India
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={{
          borderWidth: 1,
          borderRadius: 50,
          borderColor: '#ccc',
        }}>
        <Avatar source={Logo} rounded={'full'} size={'medium'} />
      </TouchableOpacity>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({});
