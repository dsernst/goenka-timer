require('howler');
var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;
var Slider = mui.Slider;
var Toggle = mui.Toggle;
var RaisedButton = mui.RaisedButton;
var CountdownTimer = require('react-countdown-timer');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      onConfigScreen: true
    };
  },

  switchScreens: function (configs) {
    this.setState(function (previousState) {
      return {onConfigScreen: !previousState.onConfigScreen};
    });
  },

  render: function () {
    return (
      <div className='home-page'>
        <h1 className='title'>S.N. Goenka meditation timer</h1>
        <Paper zDepth={3} className="main-box" style={{padding: "20px"}}>
          {this.state.onConfigScreen ? <ConfigScreen switchScreens={this.switchScreens} /> : <PlaybackScreen switchScreens={this.switchScreens} />}
        </Paper>
      </div>
    );
  }
});

var maxTime = 90;

var Duration = React.createClass({
  render: function () {
    return (
      <CountdownTimer initialTimeRemaining={this.props.time * (maxTime * 60 * 1000)} />
    );

  }
});

var ConfigScreen = React.createClass({
  getInitialState: function () {
    return {
      duration: (15 / maxTime),
      introChanting: false,
      closingChanting: false,
      metta: false
    };
  },

  render: function () {
    return (
      <div>
        <Slider name="durationSlider" description="How long would you like to sit?" style={{color: "rgba(255, 255, 255, 1)", margin: "0px 0px 40px", height: "30px"}} onChange={this.changeDuration} />
        <Toggle label="Include intro chanting?" onToggle={this.toggleIntroChanting} />
        <Toggle label="Include closing chanting?" onToggle={this.toggleClosingChanting} />
        <Toggle label="Include extra time for metta?" onToggle={this.toggleMetta} />
        <RaisedButton label="Start" fullWidth={true} style={{margin: "20px 0"}} onClick={this.pressStart} />
      </div>
    );
  },

  changeDuration: function (e, value) {
    this.setState({duration: value});
    // console.log('changed duration:', value)
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
    this.props.switchScreens(this.state);
  }
});

var PlaybackScreen = React.createClass({
  componentDidMount: function () {
    var sound = new Howl({
      urls: ['../audio/intro-chanting.mp3']
    }).play();
  },

  render: function () {
    return (
      <div>
        <Duration time={15 / maxTime /*this.state.duration*/} />
        <RaisedButton label="Pause" fullWidth={true} style={{margin: "20px 0"}} onClick={this.pressPause} />
        <RaisedButton label="Stop" fullWidth={true} style={{margin: "20px 0"}} onClick={this.pressStop} />
      </div>
    );
  },

  pressPause: function () {
    sound.pause();
  },

  pressStop: function () {
    this.props.switchScreens(this.state);
  }

});
