import React from 'react';
import { Text, StyleSheet } from 'react-native';

const defaultText = ({ children, style }) => {
  return <Text style={{ ...styles.text, ...style }}>{children}</Text>;
};

let styles = StyleSheet.create({
  text: {
    fontFamily: 'open-sans',
    fontSize: 17
  }
});

export default defaultText;
