var _ = require('lodash')

var initialState = {
  // config:
  duration: '0:20',
  intro: false,
  closing: false,
  metta: false,
}

module.exports = {
  reducer: function (state, action) {
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

    console.log('triggered default action.type')
    return state
  },
}
