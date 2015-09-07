require('howler') /*global Howl*/
var React = require('react')
var _ = require('lodash')
var mui = require('material-ui')
var RaisedButton = mui.RaisedButton
var colors = mui.Styles.Colors
var Duration = require('./Duration.jsx')
var Navigation = require('react-router').Navigation

var hMM2ms = require('./hMM-to-ms.js')

module.exports = require('react-redux').connect(_.identity)(React.createClass({
  mixins: [Navigation],

  getInitialState: function () {
    var durationAsMs = hMM2ms(this.props.duration)
    return {
      track: {pause: _.noop, play: _.noop},
      isPlaying: true,
      timeRemaining: durationAsMs,
      playlist: require('./generate-playlist.js')(durationAsMs, this.props),
    }

  },

  shouldComponentUpdate: function (nextProps, nextState) {
    // only re-render when this.state.isPlaying changes
    return nextState.isPlaying !== this.state.isPlaying
  },

  render: function () {
    var isPlaying = this.state.isPlaying
    return 0,
      <div className="play-screen">

        <Duration time={this.state.timeRemaining} isPlaying={isPlaying} updateTimeRemaining={this.updateTimeRemaining} playlist={this.state.playlist} playNextTrack={this.playNextTrack} />

        <RaisedButton label={isPlaying ? 'Pause' : 'Resume'} fullWidth style={{margin: '20px 0'}}
          backgroundColor={isPlaying ? colors.amber700 : colors.lightGreen700} onClick={function () {
            isPlaying ? this.state.track.pause() : this.state.track.play()
            this.setState({isPlaying: !this.state.isPlaying})
          }.bind(this)} />

        <RaisedButton label="Stop" fullWidth style={{margin: '20px 0'}} backgroundColor={colors.redA700}
          onClick={this.transitionTo.bind(null, '/')} />

      </div>
  },

  updateTimeRemaining: function (timeRemaining) {
    this.setState({timeRemaining: timeRemaining})
  },

  playNextTrack: function () {
    var nextTrack = new Howl({urls: [this.state.playlist.shift().file]}).play()
    this.setState({track: nextTrack})
  },

  componentWillUnmount: function () {
    this.state.track.stop()
  },

}))
