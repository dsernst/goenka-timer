require('howler') /*global Howl*/
var React = require('react')
var _ = require('lodash')
var mui = require('material-ui')
var RaisedButton = mui.RaisedButton
var Colors = mui.Styles.Colors
var Duration = require('./Duration.js')
var audio = require('./audio-config.js')
var Footer = require('./Footer.jsx')

function nullTrackControl() {
  // console.log('no track playing')
}

module.exports = React.createClass({
  getInitialState: function () {
    return _.extend(this.props.settings, {
      sound: {pause: nullTrackControl, play: nullTrackControl},
      isPaused: false,
      timeRemaining: this.props.settings.duration,
    })
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    // only re-render when this.state.isPaused changes
    return nextState.isPaused !== this.state.isPaused
  },

  updateTimeRemaining: function (millisecondsRemaining) {
    this.setState({timeRemaining: millisecondsRemaining})
  },

  componentWillMount: function () {
    this.setState({playlist: this.calculateStartTimes()})
    // this.state.sound.play()
  },

  render: function () {
    return 0,
      <div>
        <Duration time={this.state.timeRemaining} isPaused={this.state.isPaused} updateTimeRemaining={this.updateTimeRemaining} playlist={this.state.playlist} playNextTrack={this.playNextTrack} />
        {this.state.isPaused ?
          <RaisedButton label="Resume" fullWidth={true} style={{margin: '20px 0'}} backgroundColor={Colors.lightGreen700} onClick={this.pressResume} /> :
          <RaisedButton label="Pause" fullWidth={true} style={{margin: '20px 0'}} backgroundColor={Colors.amber700} onClick={this.pressPause} />
        }
        <RaisedButton label="Stop" fullWidth={true} style={{margin: '20px 0'}} backgroundColor={Colors.redA700} onClick={this.pressStop} />
        <Footer />
      </div>
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
    this.props.switchScreens({onConfigScreen: true}, {})
  },

  calculateStartTimes: function () {
    var duration = this.state.duration
    var startTimes = []

    startTimes.push({
      time: duration,
      file: audio.directory + audio.introInstructions.filename,
    })

    if (this.state.introChanting) {
      // delay introInstructions' start time
      startTimes[0].time -= audio.introChanting.length,
      startTimes.unshift({
        time: duration,
        file: audio.directory + audio.introChanting.filename,
      })
    }

    if (this.state.closingChanting) {
      startTimes.push({
        time: audio.closingChanting.length + audio.closingMetta.length,
        file: audio.directory + audio.closingChanting.filename,
      })
    }

    if (this.state.metta) {
      startTimes.push({
        time: audio.mettaIntro.length + audio.closingMetta.length,
        file: audio.directory + audio.mettaIntro.filename,
      })
      if (this.state.closingChanting) {
        // we need to start the closingChanting sooner, if we're doing extended metta
        startTimes[startTimes.length - 2].time += audio.mettaIntro.length
      }
    }

    startTimes.push({
      time: audio.closingMetta.length,
      file: audio.directory + audio.closingMetta.filename,
    })

    return startTimes
  },

  playNextTrack: function () {
    var track = this.state.playlist.shift()
    this.setState({sound: new Howl({urls: [track.file]}).play()})
  },

})
