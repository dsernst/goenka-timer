var React = require('react')
var TimePicker = require('react-time-picker')

module.exports = React.createClass({
  getInitialState: function () {
    return {
      value: this.props.defaultDuration,
    }
  },

  render: function () {
    var inputStyle = {
      fontSize: 36,
      padding: 5,
      background: 'none',
      color: '#f6f6f6',
      border: 'none',
    }

    var timePickerStyle = {
      border: 'none',
      width: 300,
      position: 'relative',
      top: '-10px'
    }

    var arrowStyle = {
      color: '#a6a6a6',
      fontSize: 36
    }

    var arrowHoverStyle = {
      color: '#f6f6f6',
      background: 'none',
      transition: 'color .1s ease-in-out'
    }

    return 0,
      <div className="duration-config">
        <h3>How long would you like to sit?</h3>
        <TimePicker value={this.state.value} onChange={this.adjustDuration} style={timePickerStyle} inputProps={{type: 'tel'}} inputStyle={inputStyle} arrowStyle={arrowStyle} arrowOverStyle={arrowHoverStyle} />
      </div>
  },

  adjustDuration: function (string) {
    this.setState({value: string})
    this.props.changeDuration(string)
  },
})

