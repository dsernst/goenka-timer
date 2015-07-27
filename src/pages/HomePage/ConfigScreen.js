var React = require('react');
var mui = require('material-ui');
var Toggle = mui.Toggle;
var RaisedButton = mui.RaisedButton;
var Colors = mui.Styles.Colors;
var TimePicker = require('react-time-picker');

function durationStringToMilliseconds(string) {
  return string.split(':').reduce(function (memo, value, index) {
    var minutes;
    if (index === 0) {
      minutes = value * 60;
    } else if (index === 1) {
      minutes = value;
    }
    return memo + (minutes * 60 * 1000);
  }, 0);
}

var DurationSelector = React.createClass({
  getInitialState: function () {
    return {
      value: this.props.defaultDuration
    };
  },

  render: function () {
    return (
      <div className="duration-setting">
        <label>How long would you like to sit?</label>
        <TimePicker value={this.state.value} onChange={this.adjustDuration} style={{border: 'none', float: 'right', width: '300px', position: 'relative', top: '-10px'}}/>
      </div>
    );
  },

  adjustDuration: function (string, moment) {
    this.setState({value: string});
    this.props.changeDuration(string);
  }
});

module.exports = React.createClass({
  getInitialState: function () {
    return {
      duration: durationStringToMilliseconds(this.props.defaultDuration),
      introChanting: false,
      closingChanting: false,
      metta: false
    };
  },

  render: function () {
    return (
      <div className="config-container">
        <DurationSelector changeDuration={this.changeDuration} defaultDuration={this.props.defaultDuration} />
        <Toggle label="Include intro chanting?" onToggle={this.toggleIntroChanting} />
        <Toggle label="Include closing chanting?" onToggle={this.toggleClosingChanting} />
        <Toggle label="Include extra time for metta?" onToggle={this.toggleMetta} />
        <RaisedButton label="Start" fullWidth={true} style={{margin: "20px 0"}} backgroundColor={Colors.lightGreen700} onClick={this.pressStart} />
      </div>
    );
  },

  changeDuration: function (string) {
    this.setState({duration: durationStringToMilliseconds(string)});
    this.props.updateDurationString(string);
    // console.log('changed duration:', string);
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
    // console.log('pressed start:', this.state);
    this.props.switchScreens({onConfigScreen: false}, this.state);
  }
});
