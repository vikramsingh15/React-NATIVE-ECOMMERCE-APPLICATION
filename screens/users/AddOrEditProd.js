import React, { useReducer, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../../components/layout/HeaderButton';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import * as actions from '../../store/actions/products';
import Input from '../../components/layout/input';
import Colors from '../../constants/Colors';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = function(state, action) {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
      };

      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid
      };
      let updatedFormIsValid = true;
      for (let key in updatedValidities) {
        updatedFormIsValid = updatedValidities[key] && updatedFormIsValid;
      }
      return {
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues
      };

    default:
      return state;
  }
};

const AddOrEditProd = ({ navigation }) => {
  let prodId = navigation.getParam('id');
  if (prodId) {
    var product = useSelector(state =>
      state.Products.userProducts.find(prod => prod.id === prodId)
    );
  }

  //form validation and handler

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: product ? product.title : '',
      imageUrl: product ? product.imageUrl : '',
      description: product ? product.description : '',
      price: ''
    },
    inputValidities: {
      title: product ? true : false,
      imageUrl: product ? true : false,
      description: product ? true : false,
      price: product ? true : false
    },
    formIsValid: product ? true : false
  });
  let { title, imageUrl, description, price } = formState.inputValues;

  //text change handler

  const textChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  let dispatch = useDispatch();

  let submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong Input ', 'please check form values !', [
        {
          text: 'OK'
        }
      ]);
      return;
    }
    try {
      if (product) {
        await dispatch(
          actions.editProduct(prodId, title, description, imageUrl)
        );
      } else {
        await dispatch(
          actions.addProduct(title, description, imageUrl, +price)
        );
      }
      navigation.goBack();
    } catch (error) {
      let err = error.message; //error coming from actions
      Alert.alert('Error ', err, [
        {
          text: 'OK'
        }
      ]);
    }
  }, [dispatch, title, description, imageUrl, price, formState]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          onChangeText={textChangeHandler}
          returnKeyType='next'
          errorText='please enter valid title'
          label='Title'
          autoCapitalize='sentences'
          autoFocus
          id='title'
          initialValue={product ? product.title : ''}
          initiallyValid={product ? true : false}
          required
        />

        <Input
          onChangeText={textChangeHandler}
          returnKeyType='next'
          label='Image Url'
          autoCapitalize='sentences'
          errorText='please enter valid url'
          id='imageUrl'
          initialValue={product ? product.imageUrl : ''}
          initiallyValid={product ? true : false}
          required
        />

        <Input
          onChangeText={textChangeHandler}
          returnKeyType='next'
          label='Price'
          autoCapitalize='sentences'
          keyboardType='decimal-pad'
          errorText='please enter valid price'
          id='price'
          initialValue={product ? product.price : ''}
          initiallyValid={product ? true : false}
          required
        />

        <Input
          onChangeText={textChangeHandler}
          returnKeyType='next'
          label='Description'
          autoCapitalize='sentences'
          numberOfLines={3}
          id='description'
          errorText='please enter valid description'
          initialValue={product ? product.description : ''}
          initiallyValid={product ? true : false}
          required
        />
      </View>
    </ScrollView>
  );
};
AddOrEditProd.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: navigation.getParam('id') ? 'Edit Product' : 'Add Product',
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title='save'
            onPress={navigation.getParam('submit')}
            iconName='md-checkmark'
          />
        </HeaderButtons>
      );
    }
  };
};

let styles = StyleSheet.create({
  form: {
    margin: 20
  }
});

export default AddOrEditProd;
