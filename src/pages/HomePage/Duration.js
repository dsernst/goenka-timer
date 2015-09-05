var React = require('react')
var CountdownTimer = require('react-countdown-timer')

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        {this.props.isPaused ?
          <div className="timer">{millisecondsToDurationString(this.props.time)}</div> :
          <CountdownTimer initialTimeRemaining={this.props.time} tickCallback={this.countdown} />
        }
      </div>
    )
  },

  countdown: function (timeRemaining) {
    this.props.updateTimeRemaining(timeRemaining)
    if (timeRemaining <= this.props.playlist[0].time) {
      this.props.playNextTrack()
    }
  },
})
