import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  TextInput,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {COLORS, fontSize, screenSize} from '../global/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {BottomSheet, Input} from '@rneui/themed';
import Button from '../components/Button';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import {baseURL} from '../../config';
import ProfileImage from '../assets/logo/logo.png';
import Entypo from 'react-native-vector-icons/Entypo';

const Profile = ({navigation}) => {
  const {logout} = useContext(AuthContext);

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const {userToken, geoLocation} = useContext(AuthContext);

  const getData = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    axios
      .get(`${baseURL}/user/profile`, config)
      .then(res => setData(res.data.data))
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  const [loadingModal, setLoadingModal] = useState(false);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const [address, setAddress] = useState({
    flatNo: '',
    aprt: '',
    city: 'Tharad, Gujarat 385565',
  });

  const addAddress = async () => {
    const details = address?.flatNo + ',' + address?.aprt + ',' + address.city;

    setLoadingModal(true);

    var config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${baseURL}/auth/address`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({address: details, geoLocation: geoLocation}),
    };

    await axios(config)
      .then(res => {
        if (res.data.error == false) {
          setModal(false);
          setLoadingModal(false);
          getData();
        }
      })
      .catch(error => {
        Alert.alert('Invalid Address');
        console.log(error);
        setLoadingModal(false);
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <BottomSheet
        modalProps={{}}
        isVisible={modal}
        onBackdropPress={() => setModal(false)}>
        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            minHeight: 400,
            padding: 20,
          }}>
          <TouchableOpacity
            style={{position: 'absolute', right: 20, top: 20, zIndex: 1}}
            onPress={() => setModal(false)}>
            <Entypo name="circle-with-cross" size={20} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: '700',
              fontSize: fontSize.size22,
              textAlign: 'center',
              color: 'black',
            }}>
            Change Address
          </Text>
          <View style={{marginTop: 20, flexDirection: 'column', gap: 20}}>
            <View style={styles.input}>
              <TextInput
                value={address.flatNo}
                onChangeText={e => setAddress({...address, flatNo: e})}
                placeholder="House / Flat / Block No."
                style={{
                  flex: 1,
                  color: 'black',
                  fontWeight: '400',
                  fontSize: 15,
                }}
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.input}>
              <TextInput
                value={address.aprt}
                onChangeText={e => setAddress({...address, aprt: e})}
                placeholder="Apartment / Road / Area"
                style={{
                  flex: 1,
                  color: 'black',
                  fontWeight: '400',
                  fontSize: 15,
                }}
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.input}>
              <TextInput
                editable={false}
                value="Tharad, Gujarat 385565"
                placeholder="Enter Your City"
                style={{
                  flex: 1,
                  color: 'black',
                  fontWeight: '400',
                  fontSize: 15,
                }}
                placeholderTextColor="#999"
              />
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <Button
              title="Add Address to Proceed"
              onPress={() => addAddress()}
              loading={loadingModal}
            />
          </View>
        </View>
      </BottomSheet>
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
              fontWeight: '700',
              color: 'black',
            }}>
            Profile
          </Text>
        </View>
        <View style={{width: '10%', alignItems: 'flex-end'}}>
          {/* <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Octicons name="pencil" size={22} style={{color: 'black'}} />
          </TouchableOpacity> */}
        </View>
      </View>
      <ScrollView style={{padding: 20, flex: 1}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={ProfileImage}
            style={{
              height: 100,
              width: 100,
              resizeMode: 'contain',
              borderWidth: 1,
              borderRadius: 10,
            }}
          />
        </View>
        <Input
          inputContainerStyle={{
            borderBottomWidth: 1,
            borderWidth: 1,
            borderColor: COLORS.red.main,
            borderRadius: 10,
            height: 50,
            width: '100%',
            marginTop: 20,
            color: 'black',
          }}
          style={{
            paddingHorizontal: 10,
            fontSize: fontSize.size15,
          }}
          containerStyle={{paddingVertical: 0, paddingHorizontal: 0}}
          placeholder="Customer Name"
          value={data?.firstName + ' ' + data?.lastName}
          editable={false}
        />
        <Input
          inputContainerStyle={{
            borderBottomWidth: 1,
            borderWidth: 1,
            borderColor: COLORS.red.main,
            borderRadius: 10,
            height: 50,
            width: '100%',
            color: 'black',
          }}
          style={{
            paddingHorizontal: 10,
            fontSize: fontSize.size15,
          }}
          containerStyle={{paddingVertical: 0, paddingHorizontal: 0}}
          placeholder="Email"
          value={data?.email}
          editable={false}
        />

        <TouchableOpacity onPress={() => toggleModal()}>
          <View
            style={{
              borderBottomWidth: 1,
              borderWidth: 1,
              borderColor: COLORS.red.main,
              borderRadius: 10,
              height: 130,
              justifyContent: 'center',
              marginBottom: 20,
              flexWrap: 'nowrap',
            }}>
            <Text
              style={{
                fontSize: fontSize.size15,
                paddingHorizontal: 10,
                padding: 10,
                color : "black"
              }}>
              {data?.address}
            </Text>

            <FontAwesome5
              name="map-marker-alt"
              style={{
                marginRight: 10,
                color: COLORS.red.main,
                fontSize: fontSize.size18,
                position: 'absolute',
                right: 10,
                zIndex: -1,
              }}
            />
          </View>
        </TouchableOpacity>

        <Input
          inputContainerStyle={{
            borderBottomWidth: 1,
            borderWidth: 1,
            borderColor: COLORS.red.main,
            borderRadius: 10,
            height: 50,
          }}
          style={{
            paddingHorizontal: 10,
            fontSize: fontSize.size15,
          }}
          keyboardType={'numeric'}
          containerStyle={{paddingVertical: 0, paddingHorizontal: 0}}
          placeholder="+91 9876543210"
          value={data?.phoneNumber}
          editable={false}
        />
        <View style={{height: 30}} />

        {/* <Button title="Logout" onPress={() => logout()} /> */}
        <View style={{height: 110}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  input: {
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
