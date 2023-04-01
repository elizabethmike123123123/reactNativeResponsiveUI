import {
  Platform,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {COLORS, fontSize, screenSize} from '../global/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseURL} from '../../config';
import axios from 'axios';
import Loader from '../components/Loader';
import moment from 'moment';
import {ScrollView} from 'react-native';

const Notification = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);

    const token = await AsyncStorage.getItem('userToken');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`${baseURL}/customer/notification`, config)
      .then(res => setData(res.data.data))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }, []);

  const ConvertTime = time => {
    const minutesAgo = moment().diff(moment(time), 'minutes'); // get time difference in minutes
    const minutesAgoFormatted = minutesAgo.toFixed(); // round to nearest integer
    if (minutesAgoFormatted > 1440) {
      return (minutesAgoFormatted / 60 / 24).toFixed(0) + ' d ago';
    } else if (minutesAgoFormatted > 60) {
      return (minutesAgoFormatted / 60).toFixed(0) + ' h ago';
    } else {
      return minutesAgoFormatted + 'm ago';
    }
  };

  const deleteData = async () => {
    setLoading(true);

    const token = await AsyncStorage.getItem('userToken');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${baseURL}/customer/notification`, config)
      .then(res => setData(null))
      .then(() => setLoading(false));
  };

  return loading ? (
    <Loader />
  ) : (
    <SafeAreaView style={{flex: 1}}>
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
        <View style={{width: '10%', justifyContent: 'center'}}></View>
        <View style={{alignItems: 'center', flex: 1}}>
          <Text
            style={{
              fontSize: fontSize.size22,
              fontWeight: '400',
              color: 'black',
            }}>
            Notifications
          </Text>
        </View>
        <View style={{width: '10%', alignItems: 'flex-end'}}></View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{padding: 20}}>
          {data?.length !== undefined &&
            data?.map((item, index) => (
              <View
                key={index}
                style={{
                  minHeight: 50,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  borderBottomColor: '#00000042',
                  borderBottomWidth: 0.5,
                  paddingVertical: 10,
                }}>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor: COLORS.red.select,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <View style={{flex: 3}}>
                    <Text style={{color: 'black', fontWeight: '600'}}>
                      {item.title}
                    </Text>
                    <Text style={{color: 'black', fontSize: fontSize.size12}}>
                      {item.body}
                    </Text>
                  </View>
                  <Text style={{color: 'black', flex: 1, textAlign: 'center'}}>
                    {ConvertTime(item?.createdAt)}
                  </Text>
                </View>
              </View>
            ))}
        </View>
        {data?.length !== undefined && (
          <View
            style={{
              maxWidth: screenSize.width,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => deleteData()}
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginRight: 20,
                backgroundColor: COLORS.red.select,
                padding: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
              }}>
              <Text style={{color: 'black', fontWeight: '600'}}>Clear All</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{height: 100}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({});
