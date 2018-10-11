import axios from 'axios';
import config from '../config/index'

export const setCustomerId = (data) => {
    return {
        type: "SET_CUSTOMERID",
        payload: data
    };
}

export const setChannelId = (data) => {
    return {
        type: "SET_CHANNELID",
        payload: data
    };
}

export const setCoinsDetails = (data) => {
    return {
        type: "SET_COINS_DETAILS",
        payload: data
    };
}

export const getSubscriptionData = (data) => {
  console.log('getSubscriptionData action ', data, `${config.getPaymentsPageText}${data}`);
  // return function (dispatch) {
    return axios({
      method: 'GET',
      url: `${config.getPaymentsPageText}${data}`,
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('getSubscriptionData response ', response);
      return {
        type: 'GET_SUBSCRIPTION_DATA',
        payload: response
      }
    })
    .catch(e => {
      console.log('get subscription error ', e);
    })
  // }
}

export const setPaymentMethod = (data) => {
    return {
        type: "SET_PAYMENT_METHOD",
        payload: data
    };
}
