var React = require('react')
var mui = require('material-ui')
var injectTapEventPlugin = require('react-tap-event-plugin')
var ThemeManager = new mui.Styles.ThemeManager()
var Footer = require('./Footer.jsx')

var store = require('redux').compose(
  require('redux-localstorage')()
  )(require('redux').createStore
  )(require('./reducer')
)

if (window.location.hostname === 'localhost') {
  store.subscribe(function() {
    console.log(store.getState()) //eslint-disable-line no-console
  })
}

var Provider = require('react-redux').Provider

var Router = require('react-router')
var RouteHandler = Router.RouteHandler

injectTapEventPlugin()

var Master = React.createClass({
  mixins: [Router.State],

  // Important!
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },
  // Important!
  getChildContext: function () {
    return {
      muiTheme: ThemeManager.getCurrentTheme(),
    }
  },
  componentWillMount: function () {
    ThemeManager.setTheme(ThemeManager.types.DARK)
  },

  render: function () {
    var Paper = mui.Paper
    return 0,
      <div className='app'>

        <h1 className='title'><a href="https://www.dhamma.org" target="_blank">S.N. Goenka</a> meditation timer</h1>

        <Paper zDepth={3} className="main-box">
          <Provider store={store}>
            { function () {return <RouteHandler />}}
           </Provider>
        </Paper>

        <Footer />

      </div>
  },
})

var ConfigScreen = require('./pages/ConfigScreen')
var PlayScreen = require('./pages/PlayScreen')

var Route = Router.Route
var DefaultRoute = Router.DefaultRoute

var routes = ( //eslint-disable-line no-extra-parens
  <Route name='app' path='/' handler={Master}>
    <DefaultRoute handler={ConfigScreen} />
    <Route name='play' handler={PlayScreen} />
  </Route>
)

Router.run(routes, function (Root) {
  React.render(<Root />, document.body)
})
