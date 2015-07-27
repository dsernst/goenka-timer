require('howler');
var React = require('react');
var CountdownTimer = require('react-countdown-timer');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var Colors = mui.Styles.Colors;

function millisecondsToDurationString(milliseconds) {
  var totalSeconds = Math.round(milliseconds / 1000);

  var seconds = parseInt(totalSeconds % 60, 10);
  var minutes = parseInt(totalSeconds / 60, 10) % 60;
  var hours = parseInt(totalSeconds / 3600, 10);

  seconds = seconds < 10 ? '0' + seconds : seconds;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  hours = hours < 10 ? '0' + hours : hours;

  return hours + ':' + minutes + ':' + seconds;
}

var PausedTimeDisplay = React.createClass({
  render: function () {
    return (
      <div className="timer">{millisecondsToDurationString(this.props.time)}</div>
    );
  }
})

var Duration = React.createClass({
  render: function () {
    return (
      <div>
        {this.props.isPaused ?
          <PausedTimeDisplay time={this.props.time} /> :
          <CountdownTimer initialTimeRemaining={this.props.time} tickCallback={this.countdown} />
        }
      </div>
    );
  },

  countdown: function (timeRemaining) {
    this.props.updateTimeRemaining(timeRemaining);
  }
});

module.exports = React.createClass({
  getInitialState: function () {
    return {
      sound: new Howl({urls: ['../audio/intro-chanting.mp3']}),
      isPaused: false,
      timeRemaining: this.props.duration
    };
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    // only re-render when this.state.isPaused changes
    return nextState.isPaused !== this.state.isPaused;
  },

  updateTimeRemaining: function (millisecondsRemaining) {
    this.setState({timeRemaining: millisecondsRemaining});
  },

  componentDidMount: function () {
    this.state.sound.play();
  },

  render: function () {
    return (
      <div>
        <Duration time={this.state.timeRemaining} isPaused={this.state.isPaused} updateTimeRemaining={this.updateTimeRemaining} />
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
