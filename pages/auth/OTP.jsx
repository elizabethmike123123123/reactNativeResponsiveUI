import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, screenSize} from '../../global/Constants';
import Button from '../../components/Button';
import OTPIMG from '../../assets/verify_otp/verify_otp.png';
import ToastManager, {Toast} from 'toastify-react-native';
import {AuthContext} from '../../context/AuthContext';
import {ScrollView} from 'react-native';

const OTP = ({navigation}) => {
  const {validateOTP, isLoading} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [pin1, setPin1] = useState(null);
  const [pin2, setPin2] = useState(null);
  const [pin3, setPin3] = useState(null);
  const [pin4, setPin4] = useState(null);
  const [pin5, setPin5] = useState(null);
  const [pin6, setPin6] = useState(null);

  const p1 = useRef(null);
  const p2 = useRef(null);
  const p3 = useRef(null);
  const p4 = useRef(null);
  const p5 = useRef(null);
  const p6 = useRef(null);

  const validation = async () => {
    Keyboard.dismiss();

    var otp = pin1 + pin2 + pin3 + pin4 + pin5 + pin6;

    if (otp.length === 6) {
      const error = await validateOTP(otp);
      setLoading(true);
      if (error === "true") {
        Toast.error('Enter Valid OTP');
      }
      setInterval(() => {
        setLoading(false);
      }, 5000);
    } else {
      Toast.error('Enter Valid OTP');
    }
  };

  return (
    <SafeAreaView>
      <ToastManager width={screenSize.width - 50} height={50} duration={5000} />
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
                Verify with OTP sent to mobile number
              </Text>
              <View
                style={{width: '100%', alignItems: 'center', marginTop: 25}}>
                <Image source={OTPIMG} style={{resizeMode: 'contain'}} />
              </View>
            </View>
            <View style={{width: '100%', flexDirection: 'column', gap: 30}}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={styles.inputBox}>
                  <TextInput
                    ref={p1}
                    value={pin1}
                    onChangeText={e => setPin1(e)}
                    onKeyPress={({nativeEvent}) => {
                      if (nativeEvent.key !== 'Backspace') {
                        p2.current.focus();
                      }
                    }}
                    keyboardType="number-pad"
                    style={styles.input}
                    maxLength={1}
                  />
                </View>
                <View style={styles.inputBox}>
                  <TextInput
                    ref={p2}
                    value={pin2}
                    onChangeText={e => setPin2(e)}
                    keyboardType="number-pad"
                    style={styles.input}
                    maxLength={1}
                    onKeyPress={({nativeEvent}) => {
                      if (nativeEvent.key === 'Backspace') {
                        p1.current.focus();
                      } else {
                        p3.current.focus();
                      }
                    }}
                  />
                </View>
                <View style={styles.inputBox}>
                  <TextInput
                    ref={p3}
                    value={pin3}
                    onChangeText={e => setPin3(e)}
                    keyboardType="number-pad"
                    style={styles.input}
                    maxLength={1}
                    onKeyPress={({nativeEvent}) => {
                      if (nativeEvent.key === 'Backspace') {
                        p2.current.focus();
                      } else {
                        p4.current.focus();
                      }
                    }}
                  />
                </View>
                <View style={styles.inputBox}>
                  <TextInput
                    ref={p4}
                    value={pin4}
                    onChangeText={e => setPin4(e)}
                    keyboardType="number-pad"
                    style={styles.input}
                    maxLength={1}
                    onKeyPress={({nativeEvent}) => {
                      if (nativeEvent.key === 'Backspace') {
                        p3.current.focus();
                      } else {
                        p5.current.focus();
                      }
                    }}
                  />
                </View>
                <View style={styles.inputBox}>
                  <TextInput
                    ref={p5}
                    value={pin5}
                    onChangeText={e => setPin5(e)}
                    keyboardType="number-pad"
                    style={styles.input}
                    maxLength={1}
                    onKeyPress={({nativeEvent}) => {
                      if (nativeEvent.key === 'Backspace') {
                        p4.current.focus();
                      } else {
                        p6.current.focus();
                      }
                    }}
                  />
                </View>
                <View style={styles.inputBox}>
                  <TextInput
                    ref={p6}
                    value={pin6}
                    onChangeText={e => setPin6(e)}
                    keyboardType="number-pad"
                    style={styles.input}
                    maxLength={1}
                    onKeyPress={({nativeEvent}) => {
                      if (nativeEvent.key === 'Backspace') {
                        p5.current.focus();
                      }
                    }}
                  />
                </View>
              </View>
              <Button loading={loading} title="Submit" onPress={validation} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OTP;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    height: screenSize.height,
    width: screenSize.width,
    padding: 20,
  },
  heading: {
    width: 282,
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 30,
    textAlign: 'center',
    color: 'black',
  },
  inputBox: {
    borderWidth: 1,
    borderColor: COLORS.red.main,
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontWeight: '700',
    fontSize: 22,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});
