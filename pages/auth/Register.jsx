import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {COLORS, fontSize, screenSize} from '../../global/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';
import {AuthContext} from '../../context/AuthContext';

const Register = ({navigation}) => {
  const [phone, setPhone] = useState(null);
  const {registerUser, updateUser} = useContext(AuthContext);

  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  const getData = async () => {
    const myphone = await AsyncStorage.getItem('userPhone');
    setPhone(myphone);
    setUserDetails({...userDetails, phoneNumber: myphone});
  };

  useEffect(() => {
    getData();
  }, []);

  if (updateUser === true) {
    getData();
  }

  const register = () => {
    registerUser(userDetails);
  };

  return (
    <SafeAreaView style={{maxWidth: screenSize.width, flex: 1}}>
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
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-sharp" size={28} color="black" />
          </TouchableOpacity> */}
        </View>
        <View style={{alignItems: 'center', flex: 1}}>
          <Text
            style={{
              fontSize: fontSize.size22,
              color: 'black',
              fontWeight: 700,
            }}>
            Register
          </Text>
        </View>
        <View style={{width: '10%', alignItems: 'flex-end'}}></View>
      </View>

      <View style={{flex: 1, padding: 20, justifyContent: 'space-between'}}>
        <View
          style={[
            {
              flexDirection: 'column',
              gap: 20,
            },
          ]}>
          <View style={styles.input}>
            <TextInput
              value={userDetails.firstName}
              onChangeText={e => setUserDetails({...userDetails, firstName: e})}
              placeholder="First Name"
              style={{
                flex: 1,
                color: '#2f2222',
                fontWeight: '400',
                fontSize: 15,
              }}
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.input}>
            <TextInput
              value={userDetails.lastName}
              onChangeText={e => setUserDetails({...userDetails, lastName: e})}
              placeholder="Last Name"
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
              value={userDetails.email}
              onChangeText={e => setUserDetails({...userDetails, email: e})}
              placeholder="E-mail"
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
            <Text
              style={{
                fontWeight: '700',
                fontSize: 15,
                lineHeight: 20,
                color: 'black',
              }}>
              +91
            </Text>
            <View
              style={{
                height: 30,
                borderWidth: 0.5,
                width: 1,
                borderColor: 'black',
              }}
            />

            <TextInput
              value={phone?.slice(3, 13)}
              placeholder="10 Digit Mobile Number"
              style={{
                flex: 1,
                color: 'black',
                fontWeight: '400',
                fontSize: 15,
              }}
              placeholderTextColor="#999"
              keyboardType="numeric"
              maxLength={10}
              editable={false}
            />
          </View>
        </View>
        <Button title="Register" onPress={() => register()} />
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    height: screenSize.height,
    width: screenSize.width,
    padding: 20,
    // flex: 1,
  },
  heading: {
    width: 282,
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 30,
    textAlign: 'center',
    color: 'black',
  },
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
