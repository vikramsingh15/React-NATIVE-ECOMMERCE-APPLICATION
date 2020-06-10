import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';
import Text from '../layout/defaultText';
import { useDispatch } from 'react-redux';

const ProductItem = ({ item, navigationHandler, children }) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version > 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  // console.log(children);
  let dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <TouchableCmp onPress={() => navigationHandler(item)} useForeground>
        <View style={{ flex: 1, height: '100%' }}>
          <View style={styles.imgContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
          </View>
          <View style={styles.detail}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>$ {item.price.toFixed(2)}</Text>
          </View>
          <View style={styles.action}>{children}</View>
        </View>
      </TouchableCmp>
    </View>
  );
};

let styles = StyleSheet.create({
  container: {
    margin: 17,
    height: Dimensions.get('window').height * 0.48,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 10
  },
  image: {
    height: '100%',
    width: '100%'
  },
  imgContainer: {
    height: '60%'
  },
  detail: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

export default ProductItem;
