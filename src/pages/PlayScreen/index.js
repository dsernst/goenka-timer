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
    return 0,
      <div className="play-screen">
        <Duration time={this.state.timeRemaining} isPaused={this.state.isPaused} updateTimeRemaining={this.updateTimeRemaining} playlist={this.state.playlist} playNextTrack={this.playNextTrack} />
        {this.state.isPaused ?
          <RaisedButton label="Resume" fullWidth={true} style={{margin: '20px 0'}} backgroundColor={Colors.lightGreen700} onClick={this.pressResume} /> :
          <RaisedButton label="Pause" fullWidth={true} style={{margin: '20px 0'}} backgroundColor={Colors.amber700} onClick={this.pressPause} />
        }
        <RaisedButton label="Stop" fullWidth={true} style={{margin: '20px 0'}} backgroundColor={Colors.redA700} onClick={this.pressStop} />
        <Footer />
      </div>
  },

  updateTimeRemaining: function (millisecondsRemaining) {
    this.setState({timeRemaining: millisecondsRemaining})
  },

  pressPause: function () {
    this.state.sound.pause()
    this.setState({isPaused: true})
  },

  pressResume: function () {
    this.state.sound.play()
    this.setState({isPaused: false})
  },

  pressStop: function () {
    this.state.sound.stop()
    this.transitionTo('/')
  },

  playNextTrack: function () {
    var track = this.state.playlist.shift()
    this.setState({sound: new Howl({urls: [track.file]}).play()})
  },

}))
