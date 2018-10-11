import React, {Component} from 'react';
import {Radio, Table, Grid, Segment, Button, Loader, Message, Icon} from 'semantic-ui-react';

const styles = {
  "titleStyle" : {
    marginTop: 25
  },
  "sectionTitle" : {
    borderBottom: '2px solid red',
    color: 'red',
    margin: 'auto'
  },
  "sectionGrid" : {
    borderBottom: '2px solid #73bbbf',
    margin: 'auto'
  },
  "sectionDescription": {
    color: '#73bbbf',
    margin: 'auto'
  },
  "sectionImage" : {
    width: 50,
    height: 50,
    margin: 'auto'
  }
}

export default class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sections: [
        {
          title: 'PRIORITY MATCHING',
          image: './priority_matching.png',
          description: 'Be first in the queue and match faster'
        },
        {
          title: 'PHOTO SHARING',
          image: './photo_sharing.png',
          description: 'Share more photos to yout chatmate after your photos are revealed'
        },
        {
          title: 'UNLIMITED ACCESS',
          image: './unlimited_access.png',
          description: 'Unlimited use of Instant Chat, Reconnect, Chat Request, Create Stories and Audio Bio Connect'
        },
        {
          title: 'PREFERRED GENDER',
          image: './prefer_gender.png',
          description: 'Customise your Chat, Stories and Audio Bios by selecting your preferred gender'
        }
      ]
    }
  }

  render() {
    let {sections} = this.state
    console.log('homepage render ');
    return (
      <div>
        <Grid container>
          <Grid.Row textAlign="center" verticalAlign="middle">
            <Grid.Column textAlign="center" verticalAlign="middle" width={16}>
              {/** <span></span><h2>NEARGROUP PREMIUM</h2> **/}
              <img src="./ng_subscription_title.png" style={styles.titleStyle} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row textAlign="center" verticalAlign="middle">
            <Grid.Column textAlign="center" verticalAlign="middle" width={16}>
              {
                sections.map((section, index) => {
                  return (<Grid key={index} container style={styles.sectionGrid}>
                    <Grid.Row><h4 style={styles.sectionTitle}>{section.title}</h4></Grid.Row>
                    <Grid.Row><img src={section.image} style={styles.sectionImage} /></Grid.Row>
                    <Grid.Row><h4 style={styles.sectionDescription}>{section.description}</h4></Grid.Row>
                  </Grid>)
                })
              }
            </Grid.Column>
          </Grid.Row>
          <Grid.Row textAlign="center" verticalAlign="middle">
            <Grid.Column textAlign="center" verticalAlign="middle" width={16}>
              {/** <span></span><h2>NEARGROUP PREMIUM</h2> **/}
              <img src="./upgrade_button.png" onClick={() => this.props.showPlans(false)} style={{cursor: 'pointer'}}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }

}
