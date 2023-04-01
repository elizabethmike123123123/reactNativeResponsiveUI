import {
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {COLORS, fontSize, screenSize} from '../global/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import CommonHeader from '../components/CommonHeader';
import Slider from '../components/Slider';
import {Text} from 'react-native';
import Categories from '../components/Categories';
import HomeRestro from '../components/HomeRestro';
import {AuthContext} from '../context/AuthContext';
import {UseContext} from '../context/UseContext';
import {Badge} from '@rneui/themed';
import Feather from 'react-native-vector-icons/Feather';

const Home = ({navigation}) => {
  const {userToken} = useContext(AuthContext);

  const {isVerify} = useContext(AuthContext);
  const [search, setSearch] = useState('');

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setSearch('');
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }, []);

  useEffect(() => {
    isVerify();
  }, []);

  const {qtyTotal} = useContext(UseContext);

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <CommonHeader navigation={navigation} />
          {/* <Button title="Order Track" onPress={() => LocalNotification()} /> */}
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
              onChangeText={e => setSearch(e)}
            />
          </View>
          <Slider />
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: fontSize.size16,
                color: 'black',
              }}>
              Categories
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: fontSize.size14,
                  color: '#00000080',
                }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <Categories navigation={navigation} />

          <HomeRestro navigation={navigation} search={search} />
          <View style={{height: 50}} />
        </View>
      </ScrollView>

      {/* Cart Bottom View */}
      {qtyTotal.qty !== 0 && (
        <View
          style={{
            // width: '100%',
            right: 0,
            borderRadius: 50,
            position: 'absolute',
            bottom:
              Platform.OS === 'ios'
                ? screenSize.height - screenSize.height + 60
                : screenSize.height - screenSize.height + 60,
            zIndex: 99,
            padding: 20,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <View
              style={{
                backgroundColor: COLORS.red.main,
                height: 52,
                width: 52,
                borderRadius: 10,
                shadowColor: '#282828ff',
                shadowOffset: {width: -2, height: 4},
                shadowOpacity: 0.4,
                shadowRadius: 10,
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <Text
                style={{
                  color: COLORS.white,
                  fontSize: fontSize.size16,
                  fontWeight: '600',
                  textAlign: 'center',
                  width: '100%',
                }}></Text> */}
              <Feather
                name="shopping-cart"
                size={fontSize.size20}
                color="white"
              />
              <Badge
                status="white"
                value={qtyTotal.qty}
                containerStyle={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  width: 15,
                  height: 15,
                }}
                textStyle={{
                  color: 'black',
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    height: screenSize.height,
    width: screenSize.width,
    padding: 20,
    paddingTop: 5,
    height: '100%',
  },
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
