import React, {Component} from 'react';
import {Radio, Table, Grid, Segment, Button, Loader, Message, Icon} from 'semantic-ui-react';
import TextField from 'material-ui/TextField';
import {red500} from 'material-ui/styles/colors';
import { withRouter } from 'react-router'
// import moment from 'moment'
import {connect} from 'react-redux'
import Fa from 'react-fontawesome'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'
import {setPaymentMethod, getSubscriptionData} from '../actions/payment'
import config from '../config/index'
import Homepage from './homepage';
// import PaymentResult from './Payments/PaymentResult';
import PaymentResult from './PaymentResult';


console.log('config in topUpPlans = ', config);

var Styles = {
  "selectedPlan": {
    height: 90,
    backgroundColor: '#e56f65',
    color: 'white',
    cursor: 'pointer'
  },
  "plan": {
    height: 90,
    backgroundColor: '#fffde4',
    color: '#ffffff',
    cursor: 'pointer'
    // boxShadow: 'grey 0px 0px 5px'
  },
  "backArrow": {
    position: 'absolute',
    zIndex: '1000',
    top: 10,
    left: 10,
    color: '#e56f65'
  }
}

var amountRegex = /^[0-9]+$/
var GetIconsDisplay = ({item, imageUrl}) => {
  console.log('icons item in topUpPlans= ', item, " ", imageUrl);
  switch (item) {
    case "0":
      return (<img
        src= {imageUrl + "002-coins1.svg"}  //{config.getImageUrl + "002-coins1.svg"}
        alt="002-coins1"
        height="87px"
        width="100px"
      />)
      break;
    case "1":
      return (<img
        src= {imageUrl + "002-coins2.svg"}
        alt="002-coins2"
        height="87px"
        width="100px"
      />)
      break;
    case "2":
      return (<img
        src= {imageUrl + "002-coins.svg"}
        alt="002-coins"
        height="87px"
        width="100px"
      />)
      break;
    case "payment_method":
      return (<img
        src= {imageUrl + "005-cash.svg"}
        alt="001-payment"
        height="87px"
        width="100px"
      />)
      break;
    default:
      return null
  }
}



class TopUpPlans extends Component {
  constructor(props) {
    super(props)

    // {amount: 2.5,"description": "Get 1 month subscription", months: 1, currency: 'usd'},
    // {amount: 5,"description": "Get 3 month subscription", months: 3, currency: 'usd'},
    // {amount: 10,"description": "Get 6 month subscription", months: 6, currency: 'usd'}
    // {amount: 150,"description": "Get 1 month subscription", months: 1, currency: 'php'},
    // {amount: 300,"description": "Get 3 month subscription", months: 3, currency: 'php'},
    // {amount: 500,"description": "Get 6 month subscription", months: 6, currency: 'php'}
    this.state = {
      topUpPlans: {
        "stripe": [],
        "mobile_load": []
      },
      selectedPaymentOption: '',
      selectedPlan: '',
      amountInput: '',
      currency: 'usd',
      amountInputError: false,
      amountInputMessage: 'Invalid Amount!',
      payLoading: false,
      stripePublishableKey: "pk_live_adIfBSG6rh8zZoAY5Kiq29nf",  //"pk_test_raSqmZhh3rMu4ao3KU8zLn0m",
      description: "NearGroup payment",
      chargeAmount: '',
      stripePaymentData: {},
      showStripeResult: false,
      showStripeButton: true,
      authId: '',
      payType: '',
      showCreditOrMobile: 'stripe',
      title: 'SUBSCRIPTION',
      modes: [],
      homepage: true,
      resultReferenceId: false
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleAmountChange = this.handleAmountChange.bind(this)
    this.initiateMolPayment = this.initiateMolPayment.bind(this)
    this.onStripeToken = this.onStripeToken.bind(this)
    this.showStripeButton = this.showStripeButton.bind(this)
    this.handleBackToHome = this.handleBackToHome.bind(this)
    this.StripePaymentResult = this.StripePaymentResult.bind(this)
    this.ShowLoading = this.ShowLoading.bind(this)
    this.handleSubscriptionSelect = this.handleSubscriptionSelect.bind(this)
    this.handleDisplayPayType = this.handleDisplayPayType.bind(this)
    this.showPlans = this.showPlans.bind(this)
  }

  componentWillMount() {
    console.log('subscription willMount= ', this.props);
    let authId, payType, resultReferenceId = false;
        const searchText = this.props.location.search;
        if(searchText && searchText.trim != ""){
            // const searchParams = searchText.split('=');
            // if(searchParams.length > 2) this.setState({ error: true });
            // authId = searchParams.pop();

            let queryObj = queryString.parse(searchText)
            console.log('got queryObj= ', queryObj);

            authId = queryObj.channelId
            resultReferenceId = queryObj.referenceId || false
            payType = queryObj.type

            // localStorage.setItem('NG_PWA_AUTHID', JSON.stringify(authId));
        }
        console.log('channelId in subscription= ', authId);
        this.setState({authId: authId, payType, resultReferenceId})
        console.log('check api call ', !(this.props.topUpPlans.length > 0));
        if(!(this.props.topUpPlans.length > 0)) {
          console.log('getSubscriptionData ');
          this.props.dispatch(getSubscriptionData(authId));
        }
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps=', nextProps, this.props, nextProps != this.props)
    if(nextProps != this.props) {
      this.setState({
        topUpPlans: nextProps.topUpPlans,
        title: nextProps.title,
        selectPlan: nextProps.selectPlan,
        modes: nextProps.modes
      })
    }

    // this.setState({accountHistory: nextProps.accountHistory, totalCoins: nextProps.totalCoins, user: nextProps.user})
  }

  handleDisplayPayType(data) {
    if(data == 'mol') data = "mobile_load"
    this.setState({showCreditOrMobile: data})
  }

  showStripeButton(val) {
    this.setState({showStripeButton: val})
    // let val = e.target.value
    // if(!isNaN(val) && Number(val) > 0) {
    //   val = Number(val) * 1000
    //   this.setState({showStripeButton: true})
    // } else {
    //   //show amount input error
    //   this.setState({amountInputError: true, showStripeButton: false})
    // }
  }

  handleSelectChange(e, { value }) {
    console.log('handleSelectChange = ', value);
    let {amountInput} = this.state

    if(value == 'OTHER_OPTIONS' || value == 'STRIPE') {

      let newState = {
        selectedPaymentOption: value,
        showAmountInput : true
      }
      if(value == 'STRIPE' && !isNaN(amountInput) && Number(amountInput) >= 1) {
        newState["showStripeButton"] = true
      } else {
        newState["showStripeButton"] = false
      }
      console.log('newState= ', newState);
      this.setState(newState)
    } else {
      this.setState({ selectedPaymentOption: value, showAmountInput: false, showStripeButton: false, amountInput: '', chargeAmount: '', amountInputError: false, amountInputMessage: 'Invalid Amount!' })
    }

    this.props.dispatch(setPaymentMethod(value))
  }

  handleAmountChange(e) {
    let amount = e.target.value, checkStripe = {showStripeButton: false}
    let {selectedPaymentOption} = this.state
    console.log('got amount=', amount);
    if(amountRegex.test(amount)) {

      if(amount <1) {
        console.log('invalid amount');
        // if(selectedPaymentOption == 'STRIPE') {
        //   checkStripe =
        // }
        this.setState({amountInputError: true, amountInput: amount, chargeAmount: amount*100, ...checkStripe})
      } else {
        if(selectedPaymentOption == 'STRIPE') {
          checkStripe = {showStripeButton: true}
        }
        this.setState({amountInputError: false, amountInput: amount, chargeAmount: amount*100, ...checkStripe})
      }
    } else {
      // checkStripe = {showStripeButton: false}
      this.setState({amountInputError: false, amountInputMessage: 'Invalid! only numbers allowed!', amountInput: amount, chargeAmount: amount*100, ...checkStripe})
    }

  }

  initiateMolPayment( type) {
    console.log('in initiateMolPayment', type);
    this.setState({payLoading: true, molLoading: true})
    let state = this.state
    let {amountInput, currency, authId} = state

    //change amount to API amount.
    amountInput *= 100

    //for live build get channelId and customerId from store.
    //only carrier billing configured for testing.
    let {customerId, channelId} = this.props.paymentData
    console.log('got customerId and channelId for mol from store=', customerId, channelId);
    let referenceId = "TRX" + Date.now()
    var returnUrl = window.location.origin + '/?referenceId=' + referenceId   //this.state.MolReturnUrl + referenceId
    console.log('returnUrl = ', returnUrl);
    let description = "NearGroup Payment"
    let body = {}
    switch (type) {
      case "mobile_load":
        console.log('in carrier billing', type);
         body = {
          channelAuth: authId,
          chauth: authId,
          paymentType: type,
          returnUrl: returnUrl,
          referenceId: referenceId,
          description: description
        }
        this.setState({carrierBillingLoading: true})
        break;
      case "OTHER_OPTIONS":
        console.log('in other options');
        body = {
          // val: "1f9978080c8188e9bcc9111b2888d164",
          // ht: "USD 2",
          channelAuth: authId,
          chauth: authId,
          paymentType: type,
          amount: amountInput,
          currencyCode: currency,
          returnUrl: returnUrl,
          referenceId: referenceId,
          description: description
        }
        this.setState({otherOptionsLoading: true})
        break;
      default:

    }

    // referenceId = state.referenceId + state.channelId + Math.floor(Date.now())
    // console.log('referenceId raw=', referenceId);
    // returnUrl = state.returnUrl + '' + referenceId
    // console.log('returnUrl raw=', returnUrl);
    // signature = state.amount  +  state.applicationCode  +  state.currency  +  state.customerId  +  state.description
    // + referenceId  + returnUrl  + state.version  + state.Secret_Key
    // console.log('signature raw=', signature);
    // signature = md5(signature)
    // console.log('signature md5=', signature);
    // this.setState({referenceId, returnUrl, signature}, () => {
    //   console.log('new state set', this.state);
    // })

    console.log('body=', body);
    let that = this
    axios.post(config.paymentRequestApi,
      body,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      }
    )
    .then((response) => {
      console.log('mol response = ', response);

      if(response.status == 200) {
        let {url} = response.data
        console.log('mol response success url=', url);
        if(url != '' && url != null && url != undefined) {
          window.location = url
        } else {
          console.log('invalid url');
        }
      } else {
        console.log('mol response error');
      }
      // this.setState({payLoading: false, molLoading: false})
    })
    .catch(e => {
      console.log('mol payment request error ', e);
      this.setState({payLoading: false, molLoading: false})
      throw Error(e)
    })

  }

  onStripeToken(token) {
    let {customerId, channelId} = this.props.paymentData
    let {authId} = this.state
    console.log('got STRIPE token= ', token);
    let body = {
      source: token.id,
      amount: Number(this.state.amountInput) * 100,   //chargeAmount,
      currency: this.state.currency,
      description: this.state.description,
      channelId: authId,  //channelId,
      chauth: authId  //customerId,
    }
    this.setState({stripeResultLoading: true})
    console.log('stripe api body: ', body);
    axios.post(config.chargeStrip,
      body,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      }
    )
    .then((response) => {
      console.log('charge stripe response = ', response);
      this.setState({stripeResultLoading: false})
      if(response.status == 200) {
        console.log("success");
        this.setState({stripePaymentData: response.data, showStripeResult: true})
      } else {
        console.log('charge stripe response error');
      }
      // this.setState({payLoading: false, molLoading: false})
    })
    .catch(e => {
      console.log('charge stripe payment request error ', e);
      this.setState({payLoading: false, molLoading: false})
      throw Error(e)
    })
  }

  handleBackToHome() {
    var MyCoinsUrl= window.location.origin
    console.log("in handleBackToHome, ");
    window.location = MyCoinsUrl + '/?channelId=' + this.state.authId
    // this.props.paymentData.customerId
    console.log("MyCoinsUrl = ", MyCoinsUrl + '/?channelId=' + this.state.authId)
  }

  StripePaymentResult({data}) {
      console.log('in StripePaymentResult = ', data, this.state);
      let elem
      switch (data.status) {
        case "succeeded":
        console.log('case 00');
          elem =  (
            <Grid container>
              <Grid.Row>
                <Grid.Column textAlign="center" verticalAlign="middle" width={16}>
                  <Fa name="check-circle" size="5x" />
                </Grid.Column>
                <Grid.Column textAlign="center" verticalAlign="middle" width={16}>
                  <h2 style={{color: '#199aab'}}><strong>Payment Successful!</strong></h2>
                </Grid.Column>
                <Grid.Column textAlign="center" verticalAlign="middle" width={16}>
                  <h2>Payment Details:</h2>
                </Grid.Column>
                <Grid.Column textAlign="right" verticalAlign="middle" width={8}>
                  <p><strong>PaymentId:</strong></p>
                </Grid.Column>
                <Grid.Column textAlign="left" verticalAlign="middle" width={8}>
                  <p style={{wordBreak: 'break-word'}}>{data.chargeId}</p>
                </Grid.Column>
                <Grid.Column textAlign="right" verticalAlign="middle" width={8}>
                  <p><strong>Amount</strong></p>
                </Grid.Column>
                <Grid.Column textAlign="left" verticalAlign="middle" width={8}>
                  <p>{Number(data.amount)/100} {data.currency}</p>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16} textAlign="center" verticalAlign="middle">
                  <Button content="Back to Subscription" onClick={this.handleBackToHome} size="large" circular
                    style={{backgroundColor: '#e56f65',  color: '#ffffff'}}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          )
          break;
        case "failed":
        console.log('case 01');
          elem = (
            <Grid container>
              <Grid.Row>
                <Grid.Column textAlign="center" verticalAlign="middle" width={16}>
                  <Fa name="exclamation-triangle" size="5x" />
                </Grid.Column>
                <Grid.Column textAlign="center" verticalAlign="middle" width={16}>
                  <h2 style={{color: '#199aab'}}><strong>Payment Incomplete!</strong></h2>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16} textAlign="center" verticalAlign="middle">
                  <Button content="Back to Subscription" onClick={this.handleBackToHome} size="large" circular
                    style={{backgroundColor: '#e56f65',  color: '#ffffff'}}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          )
          break;
          default:
            return null
        }
        return elem
  }

  ShowLoading() {
    let {stripeResultLoading} = this.state
    console.log("showloading - ", stripeResultLoading, this.state);
    if(stripeResultLoading) {
      return (<Grid.Row><Grid.Column width={16} textAlign="center">
        <Loader style={{marginTop: 50}} active inline='centered' />
       </Grid.Column></Grid.Row>)
    } else {
      return null
    }
  }

  handleSubscriptionSelect(amountInput, currency, index) {
    console.log('in handleSubscriptionSelect= ', amountInput, currency);
    // let amounts = [5, 10, 15]
    // let selectedAmount = amounts[data]
    // console.log('selectedAmount= ', selectedAmount);
    this.setState({amountInput: Number(amountInput), currency, selectedPlan: index}, () => {
      console.log('amountInput, currency set ', this.state);
    })
  }

  showPlans(val = true) {
    console.log('showPlans ',val);
    this.setState({homepage: val})
  }

  render() {
    let state = this.state
    let props = this.props
    let imageUrl = window.location.origin + "/images/"
    let selectedMode = state.showCreditOrMobile
    if(state.showCreditOrMobile == 'mobile_load') selectedMode = "mol";
    let {homepage, amountInput} = this.state
    console.log("showCreditOrMobile = ", state, props, homepage);

    if(state.resultReferenceId != false) {
      return <PaymentResult />
    }

    return (<div>
      {
        homepage ?
        <Homepage showPlans={this.showPlans}/>
        :

        (<Grid style={{margin: "30px 0px"}}>
        {
          this.state.showStripeResult ?
          <this.StripePaymentResult data={this.state.stripePaymentData} />
          :

            <Grid.Row >
                {
                  this.state.molLoading ?
                  (<Grid.Column width={16} textAlign="center">
                    <Loader style={{marginTop: 50}} active inline='centered' />
                    <h3>Loading payment gateway..</h3>
                   </Grid.Column>)
                  :
                  (<Grid.Column width={16} textAlign="center">
                  <Grid>
                    <div style={Styles.backArrow} onClick={(e) => {
                      console.log("backArrow click");
                      this.setState({homepage: true})
                    }}
                    >
                      <Fa name="arrow-left" size="3x" />
                    </div>
                    <Grid.Row>
                      <Grid.Column width={16} textAlign="center" >
                        <img src={'./subscription-icon.png'} style={{width: 60, height: 60}}/>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                      <Grid.Column width={16} textAlign="center" >
                        <h2 style={{color: 'black', fontSize: 30}}><strong>{state.title}</strong></h2>
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row >
                      <Grid.Column width={16} textAlign="center" >
                        {
                          state.modes.length > 0 && (<Button.Group>
                          {
                            state.modes.map((mode, index) => {
                              console.log('render mode ', mode);
                              return (<Button key={index} onClick={e => this.handleDisplayPayType(mode.type)} size="large"
                                style={selectedMode == mode.type ?  {backgroundColor: '#e56f65',  color: '#ffffff'} : {backgroundColor: '#fffde4', border: "0.5px solid #fffde4", color: '#e56f65'}}
                              >{mode.text}</Button>)
                            })
                          }

                          {/**
                            <Button onClick={e => this.handleDisplayPayType("stripe")} size="large"
                            style={state.showCreditOrMobile == "stripe" ?  {backgroundColor: '#e56f65',  color: '#ffffff'} : {backgroundColor: '#ffffff', border: "0.5px solid #e56f65"}}
                          >Credit Card</Button>
                          <Button onClick={e => this.handleDisplayPayType("mobile_load")} size="large"
                            style={state.showCreditOrMobile == "mobile_load" ?  {backgroundColor: '#e56f65',  color: '#ffffff'} : {backgroundColor: '#ffffff', border: "0.5px solid #e56f65"}}
                          >Mobile Load</Button>
                        **/}
                        </Button.Group>)}
                      </Grid.Column>
                    </Grid.Row>

                    {
                      state.topUpPlans[state.showCreditOrMobile].map((item, index) => (
                        <Grid.Row key={index} style={{margin: "0px 30px", padding: 0}}>
                          <Grid.Column width={16} textAlign="left" verticalAlign="middle">
                            <Segment
                              onClick={() => this.handleSubscriptionSelect(item.amount, item.currency, index)}
                              style={state.selectedPlan === index ? Styles.selectedPlan : Styles.plan}
                            >
                              <Grid style={{height: 'inherit'}}>
                                <Grid.Row verticalAlign='middle' style={{padding: 5}}>
                                  <Grid.Column width={16} textAlign="center" >
                                    <h2 style={state.selectedPlan === index ? {} : {color: '#e56f65'}}>
                                    {item.text} {state.showCreditOrMobile == "stripe" && (<span>$</span>)}{state.showCreditOrMobile == "mobile_load" && (<span>&#8369;</span>)} {item.amount}
                                    </h2>
                                  </Grid.Column>
                                </Grid.Row>
                                <Grid.Row verticalAlign='middle' style={{padding: 5}}>
                                  <Grid.Column width={16} textAlign="center" >
                                    <p style={state.selectedPlan === index ? {} : {color: '#e56f65'}}>{item.description}{/** Get <strong>{item.months}</strong> months subscription. **/}</p>
                                  </Grid.Column>
                                </Grid.Row>
                              </Grid>
                            </Segment>
                          </Grid.Column>
                          {/**
                            (<Grid.Column width={4} textAlign="right" >
                            <GetIconsDisplay item={index.toString()} imageUrl={imageUrl} />
                          </Grid.Column>)
                          **/}
                        </Grid.Row>
                      ))
                    }

                    {/**
                      <Grid.Row >
                      <Grid.Column width={16} textAlign="center">
                        <h2 style={{color: '#00bcd4'}}><strong>SELECT PAYMENT METHOD</strong></h2>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                      <Grid.Column width={16} textAlign="center">
                        <GetIconsDisplay item={"payment_method"} imageUrl={imageUrl} />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                      <Grid.Column width={5} textAlign="center"></Grid.Column>
                      <Grid.Column width={6} textAlign="left">
                            <Radio
                              label='Mobile Payment'
                              name='radioGroup'
                              value='mobile_load'
                              checked={state.selectedPaymentOption === 'mobile_load'}
                              onChange={this.handleSelectChange}
                            />
                      </Grid.Column>
                      <Grid.Column width={5} textAlign="center"></Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={5} textAlign="center"></Grid.Column>
                      <Grid.Column width={6} textAlign="left">
                        <Radio
                          label='zGold-Mol points/Paypal/Credit Card'
                          name='radioGroup'
                          value='OTHER_OPTIONS'
                          checked={state.selectedPaymentOption === 'OTHER_OPTIONS'}
                          onChange={this.handleSelectChange}
                        />
                      </Grid.Column>
                      <Grid.Column width={5} textAlign="center"></Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={5} textAlign="center"></Grid.Column>
                      <Grid.Column width={6} textAlign="left">
                        <Radio
                          label='Credit Card'
                          name='radioGroup'
                          value='STRIPE'
                          checked={state.selectedPaymentOption === 'STRIPE'}
                          onChange={this.handleSelectChange}
                        />
                      </Grid.Column>
                      <Grid.Column width={5} textAlign="center"></Grid.Column>
                    </Grid.Row>
                  **/}
                    {/**
                      state.showAmountInput &&
                      (<Grid.Row >
                        <Grid.Column width={16} textAlign="center">
                          <TextField
                            floatingLabelText="Enter Amount"
                            errorText={state.amountInputError ? state.amountInputMessage : ""}
                            onChange={this.handleAmountChange}
                          />
                        </Grid.Column>
                      </Grid.Row>)
                    }
                    {
                      state.showStripeButton &&
                      (<Grid.Row >
                        <Grid.Column width={16} textAlign="center">
                          <p>Minimum amount is 0.5 USD</p>
                        </Grid.Column>
                      </Grid.Row>)
                    **/}
                    {
                      state.selectedPlan !== '' ?
                      <Grid.Row >
                        {
                          state.showCreditOrMobile == "mobile_load" &&
                            (<Grid.Column width={16} textAlign="center" >
                                <Button size="large" circular disabled={state.selectedPlan===''} loading={state.payLoading}
                                  style={{backgroundColor: '#e56f65', color: '#ffffff'}} onClick={e => this.initiateMolPayment(state.showCreditOrMobile)}
                                >CONTINUE</Button>
                            </Grid.Column>)
                        }
                        {
                          state.showCreditOrMobile == "stripe" &&
                            (<Grid.Column width={16} textAlign="center">
                            <StripeCheckout token={this.onStripeToken} stripeKey={this.state.stripePublishableKey}
                            amount={Number(amountInput) * 100} currency={this.state.currency.toUpperCase()} description={this.state.description}
                            email={""}
                            />
                          </Grid.Column>)
                        }
                      </Grid.Row >
                      :
                      (<Grid.Row>
                        <Grid.Column width={16} textAlign="center">
                        <h4>{state.selectPlan} ..</h4>
                        </Grid.Column>
                      </Grid.Row>)
                    }

                    {/**
                      (<Grid.Row >
                      <Grid.Column width={16} textAlign="center" >
                          <Link to={'/?channelId=' + props.paymentData.customerId} replace><Button  size="large" circular
                            style={{backgroundColor: '#e56f65', color: '#ffffff'}}
                          >CANCEL</Button></Link>
                      </Grid.Column>
                    </Grid.Row>)
                    **/}

                  </Grid>
                </Grid.Column>)}
              </Grid.Row>
            }
        </Grid>)
        }
      </div>
    )
  }

}

function mapStateToProps(state) {
  console.log('in index mapStateToProps ', state );
  return {
    paymentData: state.payment,
    topUpPlans: state.payment.topUpPlans || [],
    // modes: state.payment.modes || [],
    // molPackages: state.payment.molPackages || [],
    // stripePackages: state.payment.stripePackages || [],
    title: state.payment.title || '',
    selectPlan: state.payment.selectPlan || '',
    modes: state.payment.modes || [],
  }
}

export default withRouter(connect(mapStateToProps)(TopUpPlans));
