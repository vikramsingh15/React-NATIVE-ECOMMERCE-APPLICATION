import React, { useCallback, useReducer, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };

    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      };

    default:
      return state;
  }
};

const input = props => {
  const [state, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initiallyValid,
    touched: false
  });

  useEffect(() => {
    props.onChangeText(props.id, state.value, state.isValid);
  }, [props.id, state.value, state.isValid]);

  let lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  let textChangeHandler = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({ type: INPUT_CHANGE, isValid, value: text });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={styles.input}
        value={state.value}
        {...props}
        onChangeText={textChangeHandler}
        autoCorrect
        autoCapitalize='sentences'
        onBlur={lostFocusHandler}
      />

      {!state.isValid && state.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

let styles = StyleSheet.create({
  formControl: {
    width: '100%',
    marginVertical: 15
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    fontSize: 15
  },
  label: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    marginVertical: 4
  },
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    fontSize: 13
  }
});
export default input;
