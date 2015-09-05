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
      <div className="duration-setting">
        <label>How long would you like to sit?</label>
        <TimePicker value={this.state.value} onChange={this.adjustDuration} style={{border: 'none', float: 'right', width: '300px', position: 'relative', top: '-10px'}}/>
      </div>
  },

  adjustDuration: function (string) {
    this.setState({value: string})
    this.props.changeDuration(string)
  },
})
