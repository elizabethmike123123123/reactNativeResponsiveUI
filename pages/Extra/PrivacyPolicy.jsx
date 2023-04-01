import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {fontSize, screenSize} from '../../global/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../context/AuthContext';
import {baseURL} from '../../../config';
import axios from 'axios';
import Loader from '../../components/Loader';
import RenderHtml from 'react-native-render-html';

const PrivacyPolicy = ({navigation}) => {
  const {userToken} = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    axios
      .get(`${baseURL}/commonEnum?privacyPolicy=true`, config)
      .then(res => setData(res.data.data?.privacyPolicy[0]?.value))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  const [htmlString, setHtmlString] = useState(null);

  useEffect(() => {
    if (typeof data === 'string') {
      const htmlString = {
        html: data,
      };
      setHtmlString(htmlString);
    }
  }, [data]);

  return loading ? (
    <Loader />
  ) : (
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
            Privacy Policy
          </Text>
        </View>
        <View style={{width: '10%', alignItems: 'flex-end'}}></View>
      </View>
      <ScrollView style={{padding: 20}}>
        {htmlString ? (
          <RenderHtml
            contentWidth={screenSize.width}
            source={htmlString}
            defaultTextProps={{style: {color: 'black'}}}
          />
        ) : (
          <Loader />
        )}
        <View style={{height: 200}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});
