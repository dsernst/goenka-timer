require('howler') /*global Howl*/
var React = require('react')
var _ = require('lodash')
var mui = require('material-ui')
var RaisedButton = mui.RaisedButton
var Colors = mui.Styles.Colors
var Duration = require('./Duration.jsx')
var Footer = require('./Footer.jsx')
var Navigation = require('react-router').Navigation

var hMM2ms = require('./hMM-to-ms.js')

module.exports = require('react-redux').connect(_.identity)(React.createClass({
  mixins: [Navigation],

  getInitialState: function () {
    var durationAsMs = hMM2ms(this.props.duration)
    return {
      sound: {pause: _.noop, play: _.noop},
      isPaused: false,
      timeRemaining: durationAsMs,
      playlist: require('./generate-playlist.js')(durationAsMs, this.props),
    }

  },

  shouldComponentUpdate: function (nextProps, nextState) {
    // only re-render when this.state.isPaused changes
    return nextState.isPaused !== this.state.isPaused
  },

  render: function () {
    var isPaused = this.state.isPaused
    return 0,
      <div className="play-screen">

        <Duration time={this.state.timeRemaining} isPaused={isPaused} updateTimeRemaining={this.updateTimeRemaining} playlist={this.state.playlist} playNextTrack={this.playNextTrack} />

        <RaisedButton label={isPaused ? 'Resume' : 'Pause'} fullWidth style={{margin: '20px 0'}}
          backgroundColor={isPaused ? Colors.lightGreen700 : Colors.amber700} onClick={function () {
            isPaused ? this.state.sound.play() : this.state.sound.pause()
            this.setState({isPaused: !this.state.isPaused})
          }.bind(this)} />

        <RaisedButton label="Stop" fullWidth style={{margin: '20px 0'}} backgroundColor={Colors.redA700}
          onClick={this.transitionTo.bind(null, '/')} />

        <Footer />

      </div>
  },

  componentWillUnmount: function () {
    this.state.sound.stop()
  },

  updateTimeRemaining: function (timeRemaining) {
    this.setState({timeRemaining: timeRemaining})
  },

  playNextTrack: function () {
    var nextTrack = new Howl({urls: [this.state.playlist.shift().file]}).play()
    this.setState({sound: nextTrack})
  },

}))
