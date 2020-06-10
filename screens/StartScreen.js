import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const StartScreen = ({ navigation }) => {
  let dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      // console.log(userData);
      if (!userData) {
        return navigation.navigate('Auth');
      }
      const transformedData = JSON.parse(userData);
      let { token, userId, expirationDate } = transformedData;
      const expiryDate = new Date(expirationDate);
      if (expiryDate < new Date() || !token || !userId) {
        return navigation.navigate('Auth');
      }
      // console.log(expiryDate);

      const expirationTime = expiryDate.getTime() - new Date().getTime();
      navigation.navigate('Shop');
      dispatch(authActions.authenticate(userId, token, expirationTime));
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  );
};

let styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StartScreen;
