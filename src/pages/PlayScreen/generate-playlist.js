var audio = require('./audio-config.js')

module.exports = function generatePlaylist (totalTime, props) {
  var startTimes = []

  startTimes.push({
    time: totalTime,
    file: audio.directory + audio.introInstructions.filename,
  })

  if (props.intro) {
    // delay introInstructions' start time
    startTimes[0].time -= audio.introChanting.length,
    startTimes.unshift({
      time: totalTime,
      file: audio.directory + audio.introChanting.filename,
    })
  }

  if (props.closing) {
    startTimes.push({
      time: audio.closingChanting.length + audio.closingMetta.length,
      file: audio.directory + audio.closingChanting.filename,
    })
  }

  if (props.metta) {
    startTimes.push({
      time: audio.mettaIntro.length + audio.closingMetta.length,
      file: audio.directory + audio.mettaIntro.filename,
    })
    if (props.closing) {
      // if we're doing extended metta, we need to start the closingChanting sooner
      startTimes[startTimes.length - 2].time += audio.mettaIntro.length
    }
  }

  startTimes.push({
    time: audio.closingMetta.length,
    file: audio.directory + audio.closingMetta.filename,
  })

  return startTimes
}
