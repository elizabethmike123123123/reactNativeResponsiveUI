import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Spinner,
  HStack,
  Heading,
  Center,
  NativeBaseProvider,
} from 'native-base';
import {COLORS} from '../global/Constants';

const Loader = () => {
  return (
    <NativeBaseProvider>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <HStack space={2} alignItems="center">
          <Spinner color={COLORS.red.main} accessibilityLabel="Loading posts" />
          <Heading color={COLORS.red.main} fontSize="md">
            Loading
          </Heading>
        </HStack>
      </View>
    </NativeBaseProvider>
  );
};

export default Loader;

const styles = StyleSheet.create({});
