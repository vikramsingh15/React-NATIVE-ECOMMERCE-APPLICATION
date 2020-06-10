import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/cart';

const CartItem = ({ item, deletable }) => {
  let dispatch = useDispatch();
  return (
    <View style={styles.item}>
      <View style={styles.itemData}>
        <Text style={{ ...styles.text, ...styles.quantity }}>
          {item.quantity}
        </Text>
        <Text style={{ ...styles.text, ...styles.price }}>
          {' '}
          {item.productTitle}
        </Text>
      </View>
      <View style={styles.itemData}>
        <Text style={{ ...styles.text, ...styles.price }}>
          $ {item.productPrice}{' '}
        </Text>

        {deletable && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              dispatch(actions.removeFromCart(item.id));
            }}
          >
            <Ionicons name='md-trash' size={23} color='red' />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

let styles = StyleSheet.create({
  deleteButton: {
    marginLeft: 20
  },
  quantity: {
    color: '#888'
  },
  text: {
    fontFamily: 'open-sans-bold',
    fontSize: 20
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 10
  }
});

export default CartItem;
