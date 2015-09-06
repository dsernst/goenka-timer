var React = require('react')
var TimePicker = require('react-time-picker')

module.exports = React.createClass({
  getInitialState: function () {
    return {
      value: this.props.defaultDuration,
    }
  },

  render: function () {
    return 0,
      <div className="duration">
        <h3>How long would you like to sit?</h3>
        <TimePicker value={this.state.value} onChange={this.setDuration} inputProps={{type: 'tel'}}/>
      </div>
  },

  setDuration: function (string) {
    this.setState({value: string})
    this.props.setDuration(string)
  },
})

