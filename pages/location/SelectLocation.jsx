import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, screenSize} from '../../global/Constants';
import Button from '../../components/Button';
import LocationIMG from '../../assets/location_map/location_map.png';
import ToastManager, {Toast} from 'toastify-react-native';
import {Dialog} from '@rneui/themed';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {AuthContext} from '../../context/AuthContext';

const SelectLocation = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const {locationHandler} = useContext(AuthContext);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  return (
    <SafeAreaView>
      <Image
        source={LocationIMG}
        style={{
          resizeMode: 'cover',
          height: screenSize.height,
          width: screenSize.width,
          position: 'absolute',
          zIndex: 0,
        }}
      />
      <ToastManager width={screenSize.width - 50} height={50} duration={5000} />
      <View style={{padding: 20}}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            height: screenSize.height - 250,
          }}>
          <Text style={styles.heading}>Select your Location!</Text>
        </View>
        <View style={{width: '100%', flexDirection: 'column', gap: 20}}>
          <Button
            title="Enter Location Manually"
            color={COLORS.red.main}
            bgColor={COLORS.red.location}
            onPress={() => navigation.navigate('ManualLocation')}
          />
          <Button title="Allow Location Access" onPress={toggleDialog} />
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
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 15,
            color: 'black',
          }}>
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

export default SelectLocation;

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
});
