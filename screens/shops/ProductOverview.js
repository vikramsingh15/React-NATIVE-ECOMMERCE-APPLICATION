import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/layout/HeaderButton';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import {
  Platform,
  SafeAreaView,
  FlatList,
  Button,
  StyleSheet,
  Dimensions,
  View,
  ActivityIndicator,
  Text
} from 'react-native';
import * as cartAction from '../../store/actions/cart';
import * as prodAction from '../../store/actions/products';
import Colors from '../../constants/Colors';

const ProductOverview = ({ navigation }) => {
  let products = useSelector(state => state.Products.availableProducts);
  let loading = useSelector(state => state.Products.loading);
  const [error, seterror] = useState(false);

  let dispatch = useDispatch();

  let fetchProductsHandler = useCallback(async () => {
    try {
      await dispatch(prodAction.fetchProducts()); //await used to run catch if error occurs
      seterror(false);
    } catch (err) {
      seterror(true);
    }
  }, [dispatch, seterror]);

  useEffect(() => {
    fetchProductsHandler();
  }, [fetchProductsHandler]);

  //refetch data when clicked on drawer

  useEffect(() => {
    const willFocusSub = navigation.addListener(
      'willFocus',
      fetchProductsHandler
    );
    return () => {
      willFocusSub.remove();
    };
  }, [fetchProductsHandler]);

  let navigationHandler = product => {
    navigation.navigate('ProductDetail', {
      product
    });
  };

  let renderItem = ({ item }) => {
    return (
      <ProductItem
        item={item}
        navigationHandler={navigationHandler}
        key={item.id}
      >
        <View style={styles.buttonContainer}>
          <Button
            title='View Details'
            style={styles.button}
            color={Colors.primary}
            onPress={() => navigationHandler(item)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title='Add To Cart'
            style={styles.button}
            color={Colors.primary}
            onPress={() => {
              dispatch(cartAction.addToCart(item));
            }}
          />
        </View>
      </ProductItem>
    );
  };

  //error handler

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title='Try again'
          onPress={fetchProductsHandler}
          color={Colors.primary}
        />
      </View>
    );
  }

  // loading;

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={products}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

ProductOverview.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Product Overview',
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title='Cart'
            iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            onPress={() => navigation.navigate('CartScreen')}
          />
        </HeaderButtons>
      );
    },
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title='Cart'
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      );
    }
  };
};

let styles = StyleSheet.create({
  buttonContainer: {
    width: Dimensions.get('window').width / 3
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ProductOverview;
