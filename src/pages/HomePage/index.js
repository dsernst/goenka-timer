var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;
var Slider = mui.Slider;
var Toggle = mui.Toggle;
var RaisedButton = mui.RaisedButton;
require('howler');

module.exports = React.createClass({
  render: function () {
    return (
      <div className='home-page'>
        <h1 className='title'>S.N. Goenka meditation timer</h1>
        <MainBox />
      </div>
    );
  }
});

var step = 90;

var Duration = React.createClass({
  render: function () {
    return (
      <h2 style={{color: "white", textAlign: "center"}}>{Math.round(this.props.time * step)} minutes</h2>
    );
  }
});

var MainBox = React.createClass({
  getInitialState: function () {
    return {
      duration: (15 / step),
      introChanting: false,
      closingChanting: false,
      metta: false
    };
  },

  render: function () {
    return (
      <Paper zDepth={3} className="main-box" style={{padding: "20px"}}>
        <Slider name="durationSlider" description="How long would you like to sit?" style={{color: "rgba(255, 255, 255, 1)", margin: "0px 0px 40px", height: "30px"}} onChange={this.changeDuration} />
        <Toggle name="introChantingToggle" value="introChanting" label="Include intro chanting?" onToggle={this.toggleIntroChanting} />
        <Toggle name="closingChantingToggle" value="closingChanting" label="Include closing chanting?" onToggle={this.toggleClosingChanting} />
        <Toggle name="mettaToggle" value="metta" label="Include extra time for metta?" onToggle={this.toggleMetta} />
        <RaisedButton label="Start" fullWidth={true} style={{margin: "20px 0"}} onClick={this.pressStart} />
        <Duration time={this.state.duration} />
      </Paper>
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
    var sound = new Howl({
      urls: ['../audio/intro-chanting.mp3']
    }).play();
  }
});
