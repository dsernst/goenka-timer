var React = require('react')

var DurationSelector = require('./DurationSelector.jsx')
var mui = require('material-ui')
var Toggle = mui.Toggle
var RaisedButton = mui.RaisedButton
var Colors = mui.Styles.Colors

module.exports = require('react-redux').connect(require('lodash').identity)(React.createClass({
  mixins: [require('react-router').Navigation],

  shouldComponentUpdate: function() {
    return false
  },

  render: function () {
    return 0,
      <div className="config">

        <DurationSelector setDuration={function (string) {
            this.props.dispatch({type: 'SET_DURATION', payload: string})
          }.bind(this)} defaultDuration={this.props.duration} />

        <Toggle onToggle={this.toggle('INTRO')}
          label="Include intro chanting? (2 min)" defaultToggled={this.props.intro} />

        <Toggle onToggle={this.toggle('CLOSING')}
          label="Include closing chanting? (3 min)" defaultToggled={this.props.closing} />

        <Toggle onToggle={this.toggle('METTA')}
          label="Include extended metta time? (4.5 min)" defaultToggled={this.props.metta} />

        <RaisedButton label="Start" onClick={this.transitionTo.bind(null, 'play')}
          fullWidth style={{margin: '20px 0 0'}} backgroundColor={Colors.lightGreen700} />

      </div>
  },

  toggle: function (key) {
    return this.props.dispatch.bind(null, {type: 'TOGGLE_' + key})
  },
}))
