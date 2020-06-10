import React, { useEffect, useState, useCallback } from 'react';
import { Platform, FlatList, SafeAreaView } from 'react-native';
import HeaderButton from '../../components/layout/HeaderButton';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';
import { fetchOrders } from '../../store/actions/orders';

const Orders = () => {
  let dispatch = useDispatch();
  const [isRefreshing, setRefreshing] = useState(false);
  let fetchOrdersHandler = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchOrders());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    fetchOrdersHandler();
  }, [fetchOrders]);
  let Orders = useSelector(state => state.Order);

  return (
    <SafeAreaView>
      <FlatList
        onRefresh={fetchOrdersHandler}
        refreshing={isRefreshing}
        data={Orders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <OrderItem
              amount={item.totalAmount}
              date={item.readableDate}
              items={item.items}
              key={item.id}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

Orders.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'All Orders',
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

export default Orders;
