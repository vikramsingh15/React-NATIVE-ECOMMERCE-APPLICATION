import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import ProductOverviewScreen from '../../screens/shops/ProductOverview';
import ProductDetailScreen from '../../screens/shops/ProductDetail';
import Colors from '../../constants/Colors';
import CartScreen from '../../screens/shops/CartScreen';
import OrdersScreen from '../../screens/shops/Orders';
import UserProductsScreen from '../../screens/users/UserProducts';
import AddOrEditProd from '../../screens/users/AddOrEditProd';
import AuthScreen from '../../screens/users/AuthScreen';

let defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.primary
  },
  headerTintColor: 'white'
};

let navigationOptions = icon => {
  return {
    drawerIcon: drawerConfig => {
      return <Ionicons size={23} color={drawerConfig.tintColor} name={icon} />;
    }
  };
};

export const ProductStackNavigator = createStackNavigator(
  {
    ProductOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    CartScreen
  },
  {
    defaultNavigationOptions,
    navigationOptions: navigationOptions('md-cart')
  }
);

export const OrdersStackNavigator = createStackNavigator(
  {
    OrdersScreen
  },
  {
    defaultNavigationOptions,
    navigationOptions: navigationOptions('md-list')
  }
);

export const UserProductsStackNav = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    ProductDetail: ProductDetailScreen,
    EditProduct: AddOrEditProd
  },
  {
    defaultNavigationOptions,
    navigationOptions: navigationOptions('md-create')
  }
);

export const AuthStackNav = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    defaultNavigationOptions
  }
);
