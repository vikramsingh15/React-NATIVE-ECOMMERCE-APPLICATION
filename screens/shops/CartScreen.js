import React from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Button
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import * as actions from '../../store/actions/orders';

const CartScreen = () => {
  let Products = useSelector(state => Object.values(state.Cart.items));
  let TotalAmount = useSelector(state => state.Cart.totalAmount);
  let renderCartItem = ({ item }) => {
    console.log(item.id);
    return <CartItem item={item} deletable key={item.id} />;
  };
  Products.sort((a, b) => (a.id > b.id ? 1 : -1));
  let dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total : <Text style={styles.amount}>$ {TotalAmount.toFixed(2)} </Text>
        </Text>
        <Button
          color={Colors.accent}
          title=' Order Now'
          onPress={() => {
            dispatch(actions.addOrder(Products, TotalAmount));
          }}
        />
      </View>
      <FlatList
        data={Products}
        renderItem={renderCartItem}
        keyExtractor={(item, index) => item.id}
      />
    </SafeAreaView>
  );
};

CartScreen.navigationOptions = {
  headerTitle: 'Cart'
};

let styles = StyleSheet.create({
  amount: { color: Colors.primary },
  summaryText: {
    fontSize: 20,
    fontFamily: 'open-sans-bold'
  },

  screen: {
    flex: 1
  },
  summary: {
    elevation: 10,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8
  }
});

export default CartScreen;
