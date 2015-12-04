var React = require('react')
var CountdownTimer = require('./react-countdown-timer')

var ms2hMM = require('./hMM-to-ms.js').reverse

module.exports = React.createClass({
  render: function () {
    return 0,
      <div>
        {this.props.isPlaying ?
          <CountdownTimer initialTimeRemaining={this.props.time} tickCallback={this.countdown} /> :
          <div className="timer">{ms2hMM(this.props.time)}</div>
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
