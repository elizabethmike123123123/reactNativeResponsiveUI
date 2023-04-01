import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import AppNav from './AppNav';
import AuthNav from './AuthNav';
import RegisterNav from './RegisterNav';

const MainStack = () => {
  const {userToken, location, isRegister} = useContext(AuthContext);

  if (userToken !== null) {
    if (Boolean(isRegister) == true) {
      return <AppNav />;
    } else {
      return <RegisterNav />;
    }
  } else {
    return <AuthNav />;
  }
};

export default MainStack;
