import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Colors from '../../constants/Colors';
import CartItem from './CartItem';

const OrderItem = ({ amount, date, items }) => {
  const [showDetails, setshowDetails] = useState(false);
  return (
    <View style={styles.itemCard}>
      <View style={styles.overView}>
        <Text style={styles.amount}>$ {amount.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.buttonCard}>
        <Button
          color={Colors.primary}
          onPress={() => {
            setshowDetails(!showDetails);
          }}
          title={!showDetails ? 'Show More' : 'Hide'}
        />
      </View>
      {showDetails &&
        items.map(item => {
          return <CartItem item={item} key={item.id} />;
        })}
    </View>
  );
};

let styles = StyleSheet.create({
  amount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  date: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#888'
  },
  buttonCard: {
    margin: 20
  },
  overView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemCard: {
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 10,
    padding: 15,
    margin: 20
  }
});

export default OrderItem;
