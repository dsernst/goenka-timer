require('howler');
var React = require('react');
var CountdownTimer = require('react-countdown-timer');
var _ = require('lodash');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var Colors = mui.Styles.Colors;

function millisecondsToDurationString(milliseconds) {
  var totalSeconds = Math.round(milliseconds / 1000);

  var seconds = parseInt(totalSeconds % 60, 10);
  var minutes = parseInt(totalSeconds / 60, 10) % 60;
  var hours = parseInt(totalSeconds / 3600, 10);

  seconds = seconds < 10 ? '0' + seconds : seconds;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  hours = hours < 10 ? '0' + hours : hours;

  return hours + ':' + minutes + ':' + seconds;
}

var PausedTimeDisplay = React.createClass({
  render: function () {
    return (
      <div className="timer">{millisecondsToDurationString(this.props.time)}</div>
    );
  }
})

var Duration = React.createClass({
  render: function () {
    return (
      <div>
        {this.props.isPaused ?
          <PausedTimeDisplay time={this.props.time} /> :
          <CountdownTimer initialTimeRemaining={this.props.time} tickCallback={this.countdown} />
        }
      </div>
    );
  },

  countdown: function (timeRemaining) {
    this.props.updateTimeRemaining(timeRemaining);
    if (timeRemaining <= this.props.playlist[0].time) {
      this.props.playNextTrack();
    }
  }
});

function nullTrackControl() {
  console.log('no track playing');
}

module.exports = React.createClass({
  getInitialState: function () {
    return _.extend(this.props.settings, {
      sound: {pause: nullTrackControl, play: nullTrackControl},
      isPaused: false,
      timeRemaining: this.props.settings.duration,
    });
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    // only re-render when this.state.isPaused changes
    return nextState.isPaused !== this.state.isPaused;
  },

  updateTimeRemaining: function (millisecondsRemaining) {
    this.setState({timeRemaining: millisecondsRemaining});
  },

  componentWillMount: function () {
    console.log('this.state', this.state);
    this.setState({playlist: this.calculateStartTimes()});
    // this.state.sound.play();
  },

  render: function () {
    return (
      <div>
        <Duration time={this.state.timeRemaining} isPaused={this.state.isPaused} updateTimeRemaining={this.updateTimeRemaining} playlist={this.state.playlist} playNextTrack={this.playNextTrack} />
        {this.state.isPaused ?
          <RaisedButton label="Resume" fullWidth={true} style={{margin: "20px 0"}} backgroundColor={Colors.lightGreen700} onClick={this.pressResume} /> :
          <RaisedButton label="Pause" fullWidth={true} style={{margin: "20px 0"}} backgroundColor={Colors.amber700} onClick={this.pressPause} />
        }
        <RaisedButton label="Stop" fullWidth={true} style={{margin: "20px 0"}} backgroundColor={Colors.redA700} onClick={this.pressStop} />
      </div>
    );
  },

  pressPause: function () {
    this.state.sound.pause();
    this.setState({isPaused: true});
  },

  pressResume: function () {
    this.state.sound.play();
    this.setState({isPaused: false});
  },

  pressStop: function () {
    this.state.sound.stop();
    this.props.switchScreens({onConfigScreen: true}, {});
  },

  calculateStartTimes: function () {
    var duration = this.state.duration;
    var startTimes = [];

    startTimes.push({
      time: duration,
      file: audio.directory + audio.introInstructions.filename
    });

    if (this.state.introChanting) {
      // delay introInstructions' start time
      startTimes[0].time -= audio.introChanting.length,
      startTimes.unshift({
        time: duration,
        file: audio.directory + audio.introChanting.filename
      })
    }

    if (this.state.closingChanting) {
      startTimes.push({
        time: audio.closingChanting.length + audio.closingMetta.length,
        file: audio.directory + audio.closingChanting.filename
      })
    }

    if (this.state.metta) {
      startTimes.push({
        time: audio.mettaIntro.length + audio.closingMetta.length,
        file: audio.directory + audio.mettaIntro.filename
      });
      if (this.state.closingChanting) {
        // we need to start the closingChanting sooner, if we're doing extended metta
        startTimes[startTimes.length - 2].time += audio.mettaIntro.length;
      }
    }

    startTimes.push({
      time: audio.closingMetta.length,
      file: audio.directory + audio.closingMetta.filename
    });

    return startTimes;
  },

  playNextTrack: function () {
    var track = this.state.playlist.shift();
    this.setState({sound: new Howl({urls: [track.file]}).play()});
  }

});

var audio = {
  directory: '../audio/',
  closingChanting: {
    filename: 'closing-chanting.mp3',
    length: ((2 * 60) + 53) * 1000
  },
  closingMetta: {
    filename: 'closing-metta.mp3',
    length: 46 * 1000
  },
  introChanting: {
    filename: 'intro-chanting.mp3',
    length: ((2 * 60) + 13) * 1000
  },
  introInstructions: {
    filename: 'intro-instructions.mp3',
    length: 16 * 1000
  },
  mettaIntro: {
    filename: 'metta-intro.mp3',
    length: 14 * 1000
  }
};
