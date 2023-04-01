import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/Home';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import SingleRestro from '../pages/restro/SingleRestro';
import SingleMenu from '../pages/restro/SingleMenu';
import Cart from '../pages/cart/Cart';
import CategoryRestro from '../pages/restro/CategoryRestro';
import Wishlist from '../pages/wishlist/Wishlist';
import Categories from '../pages/Categories';
import Profile from '../pages/Profile';
import ThankYou from '../pages/ThankYou';
import Search from '../pages/Search';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import HomeIcon from '../assets/Tabs/Home/Home.png';
import HomeFillIcon from '../assets/Tabs/Home/HomeFill.png';
import NotificationIcon from '../assets/Tabs/Notification/notification.png';
import NotificationFillIcon from '../assets/Tabs/Notification/notificationFillIcon.png';
import HistoryIcon from '../assets/Tabs/History/History.png';
import HistoryFillIcon from '../assets/Tabs/History/HistoryFill.png';
import BarIcon from '../assets/Tabs/Bars/Bar.png';
import Setting from '../pages/settings/Setting';
import PrivacyPolicy from '../pages/Extra/PrivacyPolicy';
import TermsCondition from '../pages/Extra/TermsCondition';
import OrderHistory from '../pages/OrderHistory';
import Notification from '../pages/Notification';
import AccountSetting from '../pages/settings/AccountSetting';

const OrderStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="OrderHistory">
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="ThankYou"
        component={ThankYou}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

const ExtraStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Setting">
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="TermsCondition"
        component={TermsCondition}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="AccountSetting"
        component={AccountSetting}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="CategoryRestro"
        component={CategoryRestro}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="SingleRestro"
        component={SingleRestro}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="SingleMenu"
        component={SingleMenu}
        options={{
          header: () => null,
        }}
      />
      {/* <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          header: () => null,
        }}
      /> */}
      <Stack.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: () => null,
        }}
      />

      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

const AppNav = ({navigation}) => {
  const navTheme = DefaultTheme;
  navTheme.colors.background = '#fff';

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            position: 'absolute',
            height: 60,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderColor: '#F42121',
            borderTopColor: '#F42121',
            borderTopWidth: 0.5,
            borderWidth: 0.5,
            backgroundColor: '#FFE5E5',
            bottom: 0,
          },

          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => {
            switch (route.name) {
              case 'HomeStack':
                return (
                  <Image
                    source={focused ? HomeFillIcon : HomeIcon}
                    resizeMode="contain"
                    style={{
                      position: 'absolute',
                      top: '30%',
                      tintColor: '#F42121',
                      width: 25,
                      height: 25,
                    }}
                  />
                );
              case 'Notification':
                return (
                  <Image
                    source={focused ? NotificationFillIcon : NotificationIcon}
                    resizeMode="contain"
                    style={{
                      position: 'absolute',
                      top: '30%',
                      tintColor: '#F42121',
                      width: 25,
                      height: 25,
                    }}
                  />
                );
              case 'HistoryStack':
                return (
                  <Image
                    source={focused ? HistoryFillIcon : HistoryIcon}
                    resizeMode="contain"
                    style={{
                      position: 'absolute',
                      top: '30%',
                      // tintColor: '#F42121',
                      width: 25,
                      height: 25,
                    }}
                  />
                );
              case 'ExtraStack':
                return (
                  <Image
                    source={focused ? BarIcon : BarIcon}
                    resizeMode="contain"
                    style={{
                      position: 'absolute',
                      top: '30%',
                      tintColor: '#F42121',
                      width: 25,
                      height: 25,
                    }}
                  />
                );
            }
          },
        })}>
        <Tab.Screen
          name="HomeStack"
          options={{header: () => {}}}
          component={HomeStack}
        />
        <Tab.Screen
          name="HistoryStack"
          options={{header: () => {}}}
          component={OrderStack}
        />
        <Tab.Screen
          name="Notification"
          options={{header: () => {}}}
          component={Notification}
        />

        <Tab.Screen
          name="ExtraStack"
          options={{header: () => {}}}
          component={ExtraStack}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNav;

const styles = StyleSheet.create({});
