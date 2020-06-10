import React from 'react';
import {
  Platform,
  SafeAreaView,
  FlatList,
  Button,
  StyleSheet,
  Dimensions,
  View,
  Alert
} from 'react-native';
import HeaderButton from '../../components/layout/HeaderButton';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import * as actions from '../../store/actions/products';

const UserProducts = ({ navigation }) => {
  let products = useSelector(state => state.Products.userProducts);
  let dispatch = useDispatch();
  let navigationHandler = product => {
    navigation.navigate('ProductDetail', {
      product
    });
  };
  const deleteHandler = id => {
    Alert.alert('Are you sure?', 'Do u really wanna delete item?', [
      { text: 'NO', style: 'default' },
      {
        text: 'YES',
        style: 'destructive',
        onPress: () => {
          dispatch(actions.deleteProduct(id));
        }
      }
    ]);
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
            title='Edit'
            style={styles.button}
            color={Colors.primary}
            onPress={() => navigation.navigate('EditProduct', { id: item.id })}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title='Delete'
            style={styles.button}
            color={Colors.primary}
            onPress={deleteHandler.bind(this, item.id)}
          />
        </View>
      </ProductItem>
    );
  };

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

UserProducts.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'User Products',
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
    },
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title='Cart'
            iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            onPress={() => navigation.navigate('EditProduct')}
          />
        </HeaderButtons>
      );
    }
  };
};

let styles = StyleSheet.create({
  buttonContainer: {
    width: Dimensions.get('window').width / 3
  }
});
export default UserProducts;
