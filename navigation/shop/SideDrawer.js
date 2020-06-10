import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import StartScreen from '../../screens/StartScreen';
import {
  OrdersStackNavigator,
  ProductStackNavigator,
  UserProductsStackNav,
  AuthStackNav
} from './StackNavigation';
import Colors from '../../constants/Colors';
import { useDispatch } from 'react-redux';
import { View, Button, SafeAreaView } from 'react-native';
import { logout } from '../../store/actions/auth';
import React from 'react';

let shopDrawerNavigation = createDrawerNavigator(
  {
    Products: ProductStackNavigator,
    Orders: OrdersStackNavigator,
    'User Products': UserProductsStackNav
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    },
    contentComponent: props => {
      let dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <Button
              title='LOGOUT'
              color={Colors.primary}
              onPress={() => {
                dispatch(logout());

                props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
    }
  }
);

//switch navigator special for auth cann't go back due to this
let AuthNavigator = createSwitchNavigator({
  StartScreen,
  Auth: AuthStackNav,
  Shop: shopDrawerNavigation
});

export default createAppContainer(AuthNavigator);
