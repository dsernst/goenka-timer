var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;
var Slider = mui.Slider;
var Toggle = mui.Toggle;

// If you are going to be using stores, be sure to first load in the `Fluxxor`
// module.
//
//     var Fluxxor = require('Fluxxor');
//
// If you want to leverage the use of stores, a suggestion would be to
// initialize an object, and set it to a `stores` variable, and adding a new
// instance of the store as a property to the object, like so:
//
//     var stores = {
//       SomeStore: new SomeStore()
//     };
//
// And also, because we are using the Flux architecture, you may also initialize
// an object full of methods that represent "actions" that will be called upon
// by a "dispatcher", like so:
//
//     var actions = {
//       doSomething: function (info) {
//         this.dispatch('DO_SOMETHING', {info: info});
//       }
//     };
//
// And finally, you would pass the stores and actions to our dispatcher, like
// so:
//
//     var flux = new Fluxxor.Flux(stores, actions);
//
// And, then, you would pass in the reference of your dispatcher to the view
// relies on the dispatcher (that view is returned by the `render` method), like
// so:
//
//     <SomeView flux={flux} />

module.exports = React.createClass({
  render: function () {
    return (
      <div className='home-page'>
        <h1 className='title'>S.N. Goenka meditation timer</h1>
        <MainBox />
      </div>
    );
  }
});

var MainBox = React.createClass({
  render: function () {
    return (
      <Paper zDepth={3} className="main-box">
        <span>How long would you like to sit?</span><br />
        <Toggle name="introChantingToggle" value="introChanting" label="Include intro chanting?" />
        <Toggle name="closingChantingToggle" value="closingChanting" label="Include closing chanting?" />
        <Toggle name="mettaToggle" value="metta" label="Include extra time for metta?" />
      </Paper>
    );
  }
});
