import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator
} from 'react-native';
import Input from '../../components/layout/input';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/Colors';
import * as actions from '../../store/actions/auth';
import { useDispatch } from 'react-redux';

const AuthScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState({
    email: false,
    password: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = form;

  let dispatch = useDispatch();

  const [signup, setSignup] = useState(false);
  let textChangeHandler = (inputIdentifier, inputValue, inputValidity) => {
    console.log(inputValue);
    setForm({ ...form, [inputIdentifier]: inputValue });
    setError({ ...error, [inputIdentifier]: inputValidity });
  };

  let submitHandler = async () => {
    //form validities check
    let formIsValid = true;
    for (const key in error) {
      formIsValid = formIsValid && error[key];
    }

    if (!formIsValid) {
      Alert.alert('Something went wrong!!', 'Check the form values!!', [
        {
          text: 'OK'
        }
      ]);
      return;
    }

    setIsLoading(true);
    try {
      if (!signup) {
        await dispatch(actions.login(email, password));
      } else {
        await dispatch(actions.signup(email, password));
      }

      navigation.navigate('Shop');
    } catch (err) {
      let msg = err.message;
      Alert.alert('Something went wrong!!', msg, [
        {
          text: 'OK'
        }
      ]);
      // navigation.goBack();
    }

    setIsLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <View style={styles.card}>
          <Input
            onChangeText={textChangeHandler}
            returnKeyType='next'
            errorText='please enter valid email'
            label='E-mail'
            keyboardType='email-address'
            email
            id='email'
            initialValue=''
            initiallyValid={false}
            required
          />
          <Input
            onChangeText={textChangeHandler}
            errorText='please enter valid password of min length 5'
            keyboardType='default'
            minLength={5}
            label='Password'
            id='password'
            initialValue=''
            initiallyValid={false}
            required
          />

          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size='small' color={Colors.primary} />
            ) : (
              <Button
                color={Colors.primary}
                onPress={submitHandler}
                title={signup ? 'SIGN UP' : 'LOG-IN'}
              />
            )}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              color={Colors.accent}
              onPress={() => {
                setSignup(prevState => !prevState);
              }}
              title={signup ? 'SWITCH TO LOGIN' : 'SWITCH TO SIGN UP'}
            />
          </View>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate'
};

let styles = StyleSheet.create({
  buttonContainer: {
    margin: 3
  },
  card: {
    elevation: 10,
    backgroundColor: 'white',
    flex: 1,
    width: '90%',
    maxHeight: Dimensions.get('window').height * 0.54,
    padding: 20,
    borderRadius: 10
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey'
  }
});

export default AuthScreen;
