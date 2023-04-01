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
import {fontSize, screenSize} from '../../global/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../context/AuthContext';
import Button from '../../components/Button';
import {COLORS} from '../../global/Constants';
import {Dialog} from '@rneui/themed';
import {baseURL} from '../../../config';
import axios from 'axios';

const AccountSetting = ({navigation}) => {
  const {userToken, logout} = useContext(AuthContext);

  const [visible, setVisible] = useState(false);

  const toggleDialog = () => {
    setVisible(!visible);
  };
  const DeleteAccount = () => {
    var config = {
      method: 'delete',
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
            Account Settings
          </Text>
        </View>
        <View style={{width: '10%', alignItems: 'flex-end'}}></View>
      </View>
      <ScrollView style={{padding: 20}}>
        <Button title="Delete Account" onPress={() => toggleDialog()} />
      </ScrollView>
      <Dialog
        isVisible={visible}
        onBackdropPress={toggleDialog}
        overlayStyle={{
          borderRadius: 10,
          padding: 30,
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontWeight: '600',
            fontSize: fontSize.size17,
            marginBottom: 20,
            color: 'black',
          }}>
          Delete Account ?
        </Text>

        <Text style={{fontWeight: '400', color: 'black'}}>
          You want to delete account Permanently with save your data with
          pootatos ?
        </Text>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
          }}>
          <Button
            onPress={() => toggleDialog()}
            width={100}
            height={40}
            bgColor={COLORS.red.location}
            color={COLORS.red.main}
            title="Cancel"
          />
          <Button
            width={100}
            height={40}
            title="Confirm"
            onPress={() => DeleteAccount()}
          />
        </View>
      </Dialog>
    </SafeAreaView>
  );
};

export default AccountSetting;

const styles = StyleSheet.create({});
