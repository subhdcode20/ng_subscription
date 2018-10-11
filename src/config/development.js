var apiBaseUrl= 'https://1c9c8bc2.ngrok.io'
var apiBaseUrlJava = 'https://test.neargroup.me/ngTesting'
// 'https://mytest.neargroup.me/pay'  //'https://993d0987.ngrok.io/NG'  //'http://localhost:8080/NG' // 'https://web.neargroup.me/ng'
var apiBaseUrlJavaLive = 'https://web.neargroup.me/ng'
var reactClientBaseUrl = 'https://pwatest2.neargroup.me'
// 'http://localhost:3000' //'pay.neargroup.me'

module.exports = {
  apiBaseUrl: apiBaseUrl,
  paymentRequestApi: apiBaseUrlJava + '/molPaymentSend',   //apiBaseUrl + "/mol/molpaymentrequest",
  payemntResultApi: apiBaseUrlJava + '/molPaymentSuccess',   //apiBaseUrl + "/mol/molpaymentsuccess?referenceId=",
  MolReturnUrl: reactClientBaseUrl + '/?referenceId=',  //'/?channelId=' , //'/?get_payment_status=true&referenceId=',
  MyCoinsUrl: reactClientBaseUrl + '/?channelId=',
  getUserCoinsDetails: apiBaseUrlJava + "/getCoinHistory?channelId=",   //apiBaseUrl + "/mol/usercoinsdetails?customerId=",
  getUserCoins: apiBaseUrlJava + '/getUserCoins?channelId=',
  getTransactionHistory: apiBaseUrlJava + '/getTransactionHistory?channelId=',
  chargeStrip: apiBaseUrlJava + '/charge_stripe',
  getPaymentsPageText: apiBaseUrlJava + '/getPaymentsPageText?channelId=',
  getImageUrl: "http://pay.neargroup.me/PaymentPageImages/"  //"/app/assets/"
}
// "http://3d30641b.ngrok.io/NG/getCoinHistory?channelId=",
