import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, fontSize} from '../global/Constants';
import {Spinner} from 'native-base';

const Button = ({
  title,
  onPress = () => {},
  bgColor,
  color,
  width,
  height,
  loading,
}) => {
  return (
    <TouchableOpacity
      disabled={loading || false}
      onPress={onPress}
      style={{
        width: width || '100%',
        height: height || 50,
        backgroundColor: loading
          ? bgColor + 22 || COLORS.red.main + 22
          : bgColor || COLORS.red.main,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#282828ff',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 10,
        borderRadius: 10,
        flexDirection: 'row',
        gap: 10,
      }}>
      {loading && <Spinner color="white" />}
      <Text
        style={{
          color: color || COLORS.white,
          fontWeight: '700',
          fontSize: fontSize.size18,
          lineHeight: 25,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
