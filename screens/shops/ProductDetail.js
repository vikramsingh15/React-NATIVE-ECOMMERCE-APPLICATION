import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Button,
  Text
} from 'react-native';
import DefaultText from '../../components/layout/defaultText';
import Colors from '../../constants/Colors';

const ProductDetail = ({ navigation }) => {
  let product = navigation.getParam('product');
  // console.log(product);
  return (
    <View style={styles.screen}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.buttonContainer}>
          <Button title='ADD TO CART' color={Colors.primary} />
        </View>
        <DefaultText style={styles.price}>$ {product.price}</DefaultText>
        <View style={styles.prodOverview}>
          <Text style={styles.description} numberOfLines={2}>
            {product.description}
          </Text>
        </View>
      </View>
    </View>
  );
};

ProductDetail.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: navigation.getParam('product').title
  };
};

let styles = StyleSheet.create({
  description: { fontFamily: 'open-sans', fontSize: 20, textAlign: 'center' },
  prodOverview: {
    marginTop: 20,
    marginHorizontal: 8
  },
  price: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: '#888'
  },
  buttonContainer: {
    marginVertical: 20
  },
  details: {
    alignItems: 'center'
  },
  screen: {
    flex: 1
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').height * 0.4
  }
});

export default ProductDetail;
