module.exports = function durationStringToMilliseconds(string) {
  return string.split(':').reduce(function (memo, value, index) {
    var minutes
    if (index === 0) {
      minutes = value * 60
    } else if (index === 1) {
      minutes = value
    }
    return memo + minutes * 60 * 1000
  }, 0)
}
