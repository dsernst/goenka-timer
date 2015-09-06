var React = require('react')
var _ = require('lodash')
var mui = require('material-ui')
var Paper = mui.Paper

var ConfigScreen = require('./ConfigScreen')
var PlaybackScreen = require('./PlaybackScreen')

module.exports = React.createClass({
  getInitialState: function () {
    return {
      onConfigScreen: true,
      durationString: '0:20',
    }
  },

  updateDurationString: function (string) {
    this.setState({durationString: string})
  },

  switchScreens: function (screen, configs) {
    this.setState(_.extend(screen, configs))
  },

  render: function () {
    return 0,
      <div className='home-page'>
        <h1 className='title'><a href="https://www.dhamma.org" target="_blank">S.N. Goenka</a> meditation timer</h1>
        <Paper zDepth={3} className="main-box">
          {this.state.onConfigScreen ?
            <ConfigScreen switchScreens={this.switchScreens} defaultDuration={this.state.durationString} updateDurationString={this.updateDurationString} /> :
            <PlaybackScreen switchScreens={this.switchScreens} settings={this.state} />
          }
        </Paper>
      </div>
  },
})
