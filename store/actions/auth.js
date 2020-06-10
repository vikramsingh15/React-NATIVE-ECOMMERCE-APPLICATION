import { AsyncStorage } from 'react-native';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
let timer;

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const login = (email, password) => {
  // console.log(email, password);
  return async dispatch => {
    let response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyAU4hJ3CW4xhTq_lZcXd0Xil9pUlKJ5ElE',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    // console.log(resData);
    let { idToken, localId, expiresIn } = resData;
    dispatch(authenticate(localId, idToken, parseInt(expiresIn) * 1000));
    const expirationDate = new Date(
      new Date().getTime() + parseInt(expiresIn) * 1000
    );
    saveDataToStorage(idToken, localId, expirationDate);
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAU4hJ3CW4xhTq_lZcXd0Xil9pUlKJ5ElE',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    // console.log(resData);
    let { idToken, localId, expiresIn } = resData;
    dispatch(authenticate(idToken, localId, parseInt(expiresIn) * 1000));
    const expirationDate = new Date(
      new Date().getTime() + parseInt(expiresIn) * 1000
    );
    saveDataToStorage(localId, idToken, expirationDate);
  };
};

export const logout = () => {
  return dispatch => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    dispatch({ type: LOGOUT });
  };
};

let clearLogoutTimer = () => {
  clearTimeout(timer);
};

const setLogoutTimer = expirationTime => {
  // console.log(expirationTime);
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

let saveDataToStorage = async (token, userId, expirationDate) => {
  await AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expirationDate: expirationDate.toISOString()
    })
  );
};
