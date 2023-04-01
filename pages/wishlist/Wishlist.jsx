import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {COLORS, fontSize, screenSize} from '../../global/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {UseContext} from '../../context/UseContext';

const Wishlist = ({navigation}) => {
  const {wishlist, WishlistToggle} = useContext(UseContext);

  return (
    <SafeAreaView style={{maxWidth: screenSize.width}}>
      <View
        style={{
          flexDirection: 'row',
          maxWidth: screenSize.width,
          alignItems: 'center',
          height: Platform.OS === 'ios' ? 30 : 50,
          margin: 20,
          marginTop: 5,
          marginBottom: 10,
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
            Wishlist
          </Text>
        </View>
        <View style={{width: '10%', alignItems: 'flex-end'}}></View>
      </View>
      <ScrollView style={{padding: 20, paddingTop: 0}}>
        {wishlist?.map((item, index) => (
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
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                flex: 1,
              }}>
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
                  {item.description.slice(0, 30) + '...'}
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
              <TouchableOpacity
                onPress={() => WishlistToggle(item)}
                style={{
                  backgroundColor: COLORS.red.select,
                  padding: 2,
                  borderRadius: 50,
                }}>
                <Ionicons name="close" size={20} color={COLORS.red.main} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Wishlist;

const styles = StyleSheet.create({});
