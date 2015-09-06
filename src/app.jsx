var React = require('react')
var Router = require('react-router')
var mui = require('material-ui')
var Paper = mui.Paper
var injectTapEventPlugin = require('react-tap-event-plugin')
var ThemeManager = new mui.Styles.ThemeManager()

var createStore = require('redux').createStore
var actions = require('./actions')
var store = createStore(actions.reducer)

var Provider = require('react-redux').Provider

store.subscribe(function() {
  console.log(store.getState())
})

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

          <div className='home-page'>
            <h1 className='title'><a href="https://www.dhamma.org" target="_blank">S.N. Goenka</a> meditation timer</h1>
            <Paper zDepth={3} className="main-box">

              <Provider store={store}>
                { function () {return <RouteHandler />}}
               </Provider>

            </Paper>
          </div>

        </div>
      </AppCanvas>
  },
})

var ConfigScreen = require('./pages/ConfigScreen')
var PlayScreen = require('./pages/PlayScreen')

var Route = Router.Route
var DefaultRoute = Router.DefaultRoute

var routes = (
  <Route name='app' path='/' handler={Master}>
    <DefaultRoute handler={ConfigScreen} />
    <Route name='home' handler={ConfigScreen} />
    <Route name='play' handler={PlayScreen} />
  </Route>
)

Router.run(routes, function (Root) {
  React.render(<Root />, document.body)
})
