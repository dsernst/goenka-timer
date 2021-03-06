var _ = require('lodash')

var initialState = {
  duration: '0:59',
  intro: false,
  closing: false,
  metta: false,
}

module.exports = function (state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  if (action.type.indexOf('TOGGLE') === 0) {
    var key = _.camelCase(action.type.slice(6))
    var newState = _.cloneDeep(state)
    newState[key] = !state[key]
    return newState
  }

  if (action.type.indexOf('SET') === 0) {
    key = _.camelCase(action.type.slice(3))
    newState = _.cloneDeep(state)
    newState[key] = action.payload
    return newState
  }

  return state
}
