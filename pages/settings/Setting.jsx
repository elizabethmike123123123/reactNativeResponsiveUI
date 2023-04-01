import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {COLORS, fontSize, screenSize} from '../../global/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import {Dialog} from '@rneui/themed';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext';
import {baseURL} from '../../../config';

const Setting = ({navigation}) => {
  const [visible, setVisible] = useState(false);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const {userToken, logout} = useContext(AuthContext);

  const DeleteAccount = () => {
    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseURL}/deleteUser`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(res => res.data.error === false && logout())
      .catch(error => console.log(error));

    setVisible(false);
  };

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
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-sharp" size={28} color="black" />
          </TouchableOpacity> */}
        </View>
        <View style={{alignItems: 'center', flex: 1}}>
          <Text
            style={{
              fontSize: fontSize.size22,
              color: 'black',
            }}>
            Settings
          </Text>
        </View>
        <View style={{width: '10%', alignItems: 'flex-end'}}></View>
      </View>
      <ScrollView style={{paddingTop: 5}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('PrivacyPolicy')}
          style={{
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: fontSize.size14, color: 'black'}}>
            Privacy Policy
          </Text>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: '#0000001A',
            borderBottomWidth: 1,
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('TermsCondition')}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: fontSize.size14, color: 'black'}}>
            Terms and Conditions
          </Text>
          <Ionicons name="chevron-forward" size={20} color={'black'} />
        </TouchableOpacity>

        <View
          style={{
            borderBottomColor: '#0000001A',
            borderBottomWidth: 1,
          }}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('AccountSetting')}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: fontSize.size14, color: 'black'}}>
            Account Setting
          </Text>
          <Ionicons name="chevron-forward" size={20} color={'black'} />
        </TouchableOpacity>

        <View
          style={{
            borderBottomColor: '#0000001A',
            borderBottomWidth: 1,
          }}
        />

        <View style={{padding: 20}}>
          <Button title="Logout" onPress={() => logout()} />
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({});
