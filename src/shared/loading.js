import React from 'react'
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
//
// class Loading extends React.Component {
//   render() {
//     return <h1>Hello...</h1>;
//   }
// }

const Loading = function (props) {
  console.log('Loading props= ', props);
  if (props.error) {
    return <div style={{ margin: '40vh auto',textAlign: 'center'}}>Something went wrong! <RaisedButton label="Retry" primary={true} onClick={ props.retry } /></div>;
  } else if (props.timedOut) {
    return <div style={{ margin: '40vh auto',textAlign: 'center'}}>Taking a long time... <RaisedButton label="Retry" primary={true} onClick={ props.retry } /></div>;
  } else if (props.pastDelay) {
    return <div style={{ margin: '40vh auto',textAlign: 'center'}}><CircularProgress /></div>;
  } else {
    return null;
  }
}

export default Loading
