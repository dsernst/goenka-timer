require('howler');
var React = require('react');
var _ = require('lodash');
var mui = require('material-ui');
var Paper = mui.Paper;
var Slider = mui.Slider;
var Toggle = mui.Toggle;
var RaisedButton = mui.RaisedButton;
var Colors = mui.Styles.Colors;
var CountdownTimer = require('react-countdown-timer');
var TimePicker = require('react-time-picker');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      onConfigScreen: true
    };
  },

  switchScreens: function (screen, configs) {
    this.setState(_.extend(screen, configs));
  },

  render: function () {
    return (
      <div className='home-page'>
        <h1 className='title'>S.N. Goenka meditation timer</h1>
        <Paper zDepth={3} className="main-box" style={{padding: "20px"}}>
          {this.state.onConfigScreen ?
            <ConfigScreen switchScreens={this.switchScreens} /> :
            <PlaybackScreen switchScreens={this.switchScreens} duration={this.state.duration} />
          }
        </Paper>
      </div>
    );
  }
});

var defaultDuration = '00:20';

function durationStringToMilliseconds(string) {
  return string.split(':')
               .reduce(function (memo, value, index) {
                  if (index === 0) {
                    var minutes = value * 60;
                  } else if (index === 1) {
                    var minutes = value;
                  }
                  return memo + (minutes * 60 * 1000);
                }, 0);
}

var DurationSelector = React.createClass({
  getInitialState: function () {
    return {
      value: defaultDuration
    };
  },

  render: function () {
    return (
      <div className="duration-setting">
        <label>How long would you like to sit?</label>
        <TimePicker value={this.state.value} onChange={this.onChangeEvent} style={{border: 'none', float: 'right', width: '300px', position: 'relative', top: '-10px'}}/>
      </div>
    );
  },

  onChangeEvent: function (value) {
    this.setState({value: value});
    this.props.action(value);
  }
});

var ConfigScreen = React.createClass({
  getInitialState: function () {
    return {
      duration: durationStringToMilliseconds(defaultDuration),
      introChanting: false,
      closingChanting: false,
      metta: false
    };
  },

  render: function () {
    return (
      <div className="config-container">
        <DurationSelector action={this.changeDuration}/>
        <Toggle label="Include intro chanting?" onToggle={this.toggleIntroChanting} />
        <Toggle label="Include closing chanting?" onToggle={this.toggleClosingChanting} />
        <Toggle label="Include extra time for metta?" onToggle={this.toggleMetta} />
        <RaisedButton label="Start" fullWidth={true} style={{margin: "20px 0"}} backgroundColor={Colors.lightGreen700} onClick={this.pressStart} />
      </div>
    );
  },

  changeDuration: function (value) {
    this.setState({duration: durationStringToMilliseconds(value)});
    // console.log('changed duration:', value);
  },

  toggleIntroChanting: function (e, toggled) {
    this.setState({introChanting: toggled});
    // console.log('toggled introChanting:', toggled);
  },

  toggleClosingChanting: function (e, toggled) {
    this.setState({closingChanting: toggled});
    // console.log('toggled closingChanting:', toggled);
  },

  toggleMetta: function (e, toggled) {
    this.setState({metta: toggled});
    // console.log('toggled metta:', toggled);
  },

  pressStart: function () {
    console.log('pressed start:', this.state);
    this.props.switchScreens({onConfigScreen: false}, this.state);
  }
});

var Duration = React.createClass({
  render: function () {
    return (
      <CountdownTimer initialTimeRemaining={this.props.time} />
    );
  }
});

var PlaybackScreen = React.createClass({
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
