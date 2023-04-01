import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, screenSize} from '../../global/Constants';
import Button from '../../components/Button';
import OTPIMG from '../../assets/otp/otp.png';
import ToastManager, {Toast} from 'toastify-react-native';
import {AuthContext} from '../../context/AuthContext';

const Login = ({navigation}) => {
  const {login} = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const onTextChanged = e => {
    setPhoneNumber(e.replace(/[^0-9]/g, ''));
  };

  const validation = async () => {
    Keyboard.dismiss();
    var valid = true;

    if (phoneNumber.length !== 10) {
      valid = false;
      Toast.error('Enter Valid Phone');
    }

    if (valid) {
      Toast.success('OTP Send Successfully');
      await login(phoneNumber);
      setLoading(true);
      setTimeout(() => {
        navigation.replace('OTP');
      }, 3000);
    }
  };

  return (
    <SafeAreaView>
      <ToastManager
        width={screenSize.width - 50}
        height={50}
        duration={5000}
        positionValue={Platform.OS === 'android' ? 0 : 50}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView style={styles.container}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '100%',
                height: screenSize.height - 250,
                alignItems: 'center',
              }}>
              <Text style={styles.heading}>
                Enter mobile number and send OTP
              </Text>
              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-end',
                  marginTop: 25,
                }}>
                <Image source={OTPIMG} style={{resizeMode: 'contain'}} />
              </View>
            </View>
            <View style={{width: '100%', flexDirection: 'column', gap: 30}}>
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
                  onChangeText={e => onTextChanged(e)}
                  value={phoneNumber}
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
                />
              </View>
              <Button loading={loading} title="Send OTP" onPress={validation} />
            </View>
          </View>
          <View style={{height: 70}} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

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
