var React = require('react')
var Router = require('react-router')
var mui = require('material-ui')
var injectTapEventPlugin = require('react-tap-event-plugin')
var ThemeManager = new mui.Styles.ThemeManager()

// A lot of the code is auto-generated. However, fiddling around with it
// shouldn't be a catastrophic failure. Just that you'd need to know your way
// around a little. However, **BE CAREFUL WHILE DELETING SOME OF THE COMMENTS IN
// THIS FILE THE AUTO-GENERATORS RELY ON SOME OF THEM**.

// inject:pagerequire
var HomePage = require('./pages/HomePage')
// endinject

// var menuItems = [
//   // inject:menuitems
//   { payload: 'home', text: 'goenka-timer' },
//   // endinject
// ]

// var titles = {
//   // inject:titles
//   '/home': 'goenka-timer',
//   // endinject
// }

var Route = Router.Route
var DefaultRoute = Router.DefaultRoute
var RouteHandler = Router.RouteHandler

var AppCanvas = mui.AppCanvas

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

  _onMenuIconButtonTouchTap: function () {
    this.refs.leftNav.toggle()
  },

  render: function () {
    return 0,
      <AppCanvas predefinedLayout={1}>

        <div className='mui-app-content-canvas'>
          <RouteHandler />
        </div>

      </AppCanvas>
  },
})

var routes = (
  <Route name='app' path='/' handler={Master}>
    {/* inject:route */}
    <Route name='home' handler={HomePage} />
    {/* endinject */}
    <DefaultRoute handler={HomePage} />
  </Route>
)

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.body)
})
