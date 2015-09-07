module.exports = function durationStringToMilliseconds(string) {
  return string.split(':').reduce(function (memo, seconds, index) {
    if (index === 0) {
      seconds *= 60
    }
    if (index <= 1) {
      seconds *= 60
    }
    return memo + seconds * 1000
  }, 0)
}

module.exports.reverse = function millisecondsToDurationString(milliseconds) {
  var totalSeconds = Math.round(milliseconds / 1000)

  var seconds = parseInt(totalSeconds % 60, 10)
  var minutes = parseInt(totalSeconds / 60, 10) % 60
  var hours = parseInt(totalSeconds / 3600, 10)

  function pad(number) {
    return number < 10 ? '0' + number : number
  }

  return [hours, minutes, seconds].map(pad).join(':')
}
