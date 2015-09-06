var React = require('react')
var CountdownTimer = require('react-countdown-timer')

function millisecondsToDurationString(milliseconds) {
  var totalSeconds = Math.round(milliseconds / 1000)

  var seconds = parseInt(totalSeconds % 60, 10)
  var minutes = parseInt(totalSeconds / 60, 10) % 60
  var hours = parseInt(totalSeconds / 3600, 10)

  seconds = seconds < 10 ? '0' + seconds : seconds
  minutes = minutes < 10 ? '0' + minutes : minutes
  hours = hours < 10 ? '0' + hours : hours

  return hours + ':' + minutes + ':' + seconds
}

module.exports = React.createClass({
  render: function () {
    return 0,
      <div>
        {this.props.isPaused ?
          <div className="timer">{millisecondsToDurationString(this.props.time)}</div> :
          <CountdownTimer initialTimeRemaining={this.props.time} tickCallback={this.countdown} />
        }
      </div>
  },

  countdown: function (timeRemaining) {
    this.props.updateTimeRemaining(timeRemaining)
    if (timeRemaining <= this.props.playlist[0].time) {
      this.props.playNextTrack()
    }
  },
})

