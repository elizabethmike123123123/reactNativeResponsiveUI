import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, screenSize} from '../../global/Constants';
import ToastManager, {Toast} from 'toastify-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Dialog} from '@rneui/themed';
import Button from '../../components/Button';
import {AuthContext} from '../../context/AuthContext';

const ManualLocation = ({navigation}) => {
  const {locationHandler} = useContext(AuthContext);

  const [visible, setVisible] = useState(false);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const locations = [
    {title: 'House no 89, New shivshakti society, old khanpur road'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ToastManager width={screenSize.width - 50} height={50} duration={5000} />
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{width: 20}}>
          <Icon name="chevron-back-outline" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>Enter your area</Text>
        <View style={{width: 20}} />
      </View>
      <View style={styles.input}>
        <Icon name="search" size={20} style={{color: COLORS.red.main}} />

        <TextInput
          placeholder="Enter area, city, etc."
          style={{
            flex: 1,
            color: 'black',
            fontWeight: '400',
            fontSize: 15,
          }}
          placeholderTextColor="#999"
        />
      </View>
      <View>
        <TouchableOpacity style={{marginTop: 20}} onPress={toggleDialog}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '600',
              fontSize: 15,
              color: COLORS.red.main,
            }}>
            Use your current location
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: '100%',
            borderWidth: 0.8,
            borderColor: '#0000001A',
            marginTop: 20,
          }}
        />
        <Text
          style={{
            marginTop: 15,
            fontWeight: '600',
            fontSize: 15,
            color: 'black',
          }}>
          Saved Addresses
        </Text>
        <View style={{marginTop: 20}}>
          {locations.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}
              onPress={() => locationHandler('Tharad')}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  maxHeight: 30,
                  maxHeight: 30,
                  backgroundColor: COLORS.red.location,
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesome5
                  name="map-marker-alt"
                  size={16}
                  color={COLORS.red.main}
                />
              </View>
              <View
                style={{
                  overflow: 'hidden',
                  maxHeight: 20,
                  flex: 1,
                  flexDirection: 'row',
                  gap: 3,
                }}>
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: 15,
                    width: '90%',
                    color: 'black',
                  }}>
                  {item.title}
                </Text>
                <Text style={{fontWeight: '400', fontSize: 15}}>...</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Modals Here */}
      <Dialog
        isVisible={visible}
        onBackdropPress={toggleDialog}
        overlayStyle={{
          borderRadius: 30,
          padding: 30,
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Text style={{textAlign: 'center', fontWeight: '600', fontSize: 15}}>
          Allow Pootatos to access this device’s location?
        </Text>
        <View
          style={{
            width: 80,
            height: 80,
            maxHeight: 80,
            maxHeight: 80,
            backgroundColor: COLORS.red.location,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <FontAwesome5
            name="map-marker-alt"
            size={40}
            color={COLORS.red.main}
          />
        </View>
        <View
          style={{
            width: '100%',
            marginTop: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
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
            title="Allow"
            onPress={() => locationHandler('Tharad')}
          />
        </View>
      </Dialog>
    </SafeAreaView>
  );
};

export default ManualLocation;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    height: screenSize.height,
    width: screenSize.width,
    padding: 20,
  },
  heading: {
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 30,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    marginTop: 40,
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
