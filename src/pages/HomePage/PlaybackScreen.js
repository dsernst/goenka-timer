require('howler');
var React = require('react');
var CountdownTimer = require('react-countdown-timer');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var Colors = mui.Styles.Colors;

var Duration = React.createClass({
  render: function () {
    return (
      <CountdownTimer initialTimeRemaining={this.props.time} />
    );
  }
});

module.exports = React.createClass({
  getInitialState: function () {
    return {
      sound: new Howl({urls: ['../audio/intro-chanting.mp3']}),
      isPaused: false
    };
  },

  componentDidMount: function () {
    this.state.sound.play();
  },

  render: function () {
    return (
      <div>
        <Duration time={this.props.duration} />
        {this.state.isPaused ?
          <RaisedButton label="Play" fullWidth={true} style={{margin: "20px 0"}} backgroundColor={Colors.lightGreen700} onClick={this.pressPlay} /> :
          <RaisedButton label="Pause" fullWidth={true} style={{margin: "20px 0"}} backgroundColor={Colors.amber700} onClick={this.pressPause} />
        }
        <RaisedButton label="Stop" fullWidth={true} style={{margin: "20px 0"}} backgroundColor={Colors.redA700} onClick={this.pressStop} />
      </div>
    );
  },

  pressPause: function () {
    this.state.sound.pause();
    this.setState({isPaused: true});
  },

  pressPlay: function () {
    this.state.sound.play();
    this.setState({isPaused: false});
  },

  pressStop: function () {
    this.state.sound.stop();
    this.props.switchScreens({onConfigScreen: true}, {});
  }
});
