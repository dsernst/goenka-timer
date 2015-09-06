var React = require('react')
var DurationSelector = require('./DurationSelector.jsx')
var mui = require('material-ui')
var Toggle = mui.Toggle
var RaisedButton = mui.RaisedButton
var Colors = mui.Styles.Colors

function durationStringToMilliseconds(string) {
  return string.split(':').reduce(function (memo, value, index) {
    var minutes
    if (index === 0) {
      minutes = value * 60
    } else if (index === 1) {
      minutes = value
    }
    return memo + minutes * 60 * 1000
  }, 0)
}

module.exports = React.createClass({
  getInitialState: function () {
    return {
      duration: durationStringToMilliseconds(this.props.defaultDuration),
      introChanting: false,
      closingChanting: false,
      metta: false,
    }
  },

  render: function () {
    return 0,
      <div className="config-container">
        <DurationSelector changeDuration={this.changeDuration} defaultDuration={this.props.defaultDuration} />
        <Toggle label="Include intro chanting? (2 min)" onToggle={this.toggleIntroChanting} />
        <Toggle label="Include closing chanting? (3 min)" onToggle={this.toggleClosingChanting} />
        <Toggle label="Include extended metta time? (4.5 min)" onToggle={this.toggleMetta} />
        <RaisedButton label="Start" fullWidth={true} style={{margin: '20px 0 0'}} backgroundColor={Colors.lightGreen700} onClick={this.pressStart} />
      </div>
  },

  changeDuration: function (string) {
    this.setState({duration: durationStringToMilliseconds(string)})
    this.props.updateDurationString(string)
  },

  toggleIntroChanting: function (e, toggled) {
    this.setState({introChanting: toggled})
  },

  toggleClosingChanting: function (e, toggled) {
    this.setState({closingChanting: toggled})
  },

  toggleMetta: function (e, toggled) {
    this.setState({metta: toggled})
  },

  pressStart: function () {
    this.props.switchScreens({onConfigScreen: false}, this.state)
  },
})
