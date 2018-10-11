import React, {Component} from 'react';
import {Grid, Button, Segment} from 'semantic-ui-react';
import axios from 'axios'
import {Redirect} from 'react-router'

class MolPay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topUpPlans: [
        {amount: 100, coins: 100, currencyCode: 'php'},
        {amount: 500, coins: 750, currencyCode: 'php'},
        {amount: 20, coins: 2000, currencyCode: 'php'}
      ],
      redirectToPayment: false
    }

    this.gotoPaymentPage = this.gotoPaymentPage.bind(this)
  }

  gotoPaymentPage(data) {
    let molAmount = Number(data.amount) * 100
    this.props.getAmount({amount: molAmount, currencyCode: data.currencyCode})

  }

  render() {
    console.log('molPay render', this.state);
    let state = this.state
    return (
      <Segment>
        <Grid container>
        <Grid.Row>
          <Grid.Column width={16}  textAlign="center" style={{height: 30}}>
            <h3>Wallet Topup Plans:</h3>
          </Grid.Column>
          <Grid.Column width={16}  textAlign="center">
            <Grid>
              {
                state.topUpPlans.length > 0 &&
                  state.topUpPlans.map((item, index) =>
                    (
                      <Grid.Row key={index}>
                        <Grid.Column width={2} textAlign="left">
                          <h3>{index}</h3>
                        </Grid.Column>
                        <Grid.Column width={6} textAlign="left">
                          <h3>{item.currencyCode.toUpperCase() +' '+ item.amount.toString()}</h3>
                        </Grid.Column>
                        <Grid.Column width={2} textAlign="left">
                          <h3> = </h3>
                        </Grid.Column>
                        <Grid.Column width={6} textAlign="left">
                          <h3>{item.coins} coins.</h3>
                        </Grid.Column>
                      </Grid.Row>
                    )
                  )
                }
            </Grid>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row textAlign="center">
          <Grid.Column width={16}  textAlign="center">
            <Grid>
              <Grid.Row>
              {
                state.topUpPlans.length > 0 &&
                  state.topUpPlans.map((item, index) =>
                    (
                        <Grid.Column width={5} textAlign="center" key={index}>
                          <Button content={item.currencyCode.toUpperCase() +' '+ item.amount.toString()} size="small" inverted color="orange" onClick={e => this.gotoPaymentPage(item)}/>
                        </Grid.Column>
                    )
                  )
              }
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column>
            {state.redirectToPayment && <Redirect to="/payment" />}
          </Grid.Column>
        </Grid.Row>
        </Grid>
      </Segment>
    )
  }

}


export default MolPay;
