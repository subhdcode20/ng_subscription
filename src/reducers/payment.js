import * as types from '../actions/types';

var initialState = {
  customerId: '',
  channelId: '',
  howToInviteFriends: "m.me/neargroup?ref=R_",
  showShareLink: false,
  loadingCoinHistory: true,
  showCoinDetails: true,
  user: {
    name: ''
  },
  paymentMethod: ''
}

export default function(state=initialState, action) {
  console.log('payment reducer ', action, action.type);
    switch (action.type) {
        case "SET_CUSTOMERID":
            console.log('SET_CUSTOMERID = ', action.payload);
            return {...state, customerId: action.payload};
        case "SET_CHANNELID":
            console.log('SET_CHANNELID = ', action.payload);
            return {...state, channelId: action.payload};
        case "SET_COINS_DETAILS":
            console.log('SET_COINS_DETAILS = ', action.payload);
            let data = action.payload
            let {user} = state
            user.name = data.userName
            return {
              ...state,
              accountHistory: data.coinsDetails,
              totalCoins: data.totalCoins,
              howToInviteFriends: state.howToInviteFriends + data.inviteCode,
              showShareLink: true,
              loadingCoinHistory: false,
              showCoinDetails: true,
              user: user
            };
            break;
          case "SET_PAYMENT_METHOD":
            return {
              ...state,
              paymentMethod: action.payload
            }
          case 'GET_SUBSCRIPTION_DATA':
          console.log('GET_SUBSCRIPTION_DATA ', action.payload);
            let response = action.payload
            let modes = [], molPackages = [], stripePackages = [], title = "", selectPlan = "";
            let topUpPlans = {"stripe" : [], "mobile_load": []}
            if(
              response.status &&
              response.status >= 200 && response.status < 300 &&
              response.data.modes && response.data.modes.length > 0
            ) {
              console.log('response ok');
              // modes = response.data.modes
              if(response.data.text.title && response.data.text.title != '') title = response.data.text.title
              if(response.data.text.selectPlan && response.data.text.selectPlan != '') selectPlan = response.data.text.selectPlan
              modes = response.data.modes
              modes.forEach((mode, index) => {
                console.log('mode= ', mode);
                switch (mode.type) {
                  case 'stripe':
                    if( response.data.text.stripePackages.length > 0 ) {
                      topUpPlans["stripe"] = response.data.text.stripePackages
                      // stripePackages = response.data.text.stripePackages
                    }
                    break;
                  case 'mol':
                  if( response.data.text.molPackages.length > 0 ) {
                    topUpPlans["mobile_load"] = response.data.text.molPackages
                    // molPackages = response.data.text.molPackages
                  }
                    break;
                  default:

                }
              })

            }
            console.log('final state ', topUpPlans, title, selectPlan);
            return {...state, title, selectPlan, topUpPlans, modes}
        default:
            return state;
    }
};
