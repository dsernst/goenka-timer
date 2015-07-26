var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;
var Slider = mui.Slider;
var Toggle = mui.Toggle;
var RaisedButton = mui.RaisedButton;

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

var store = {
  duration: 15,
  introChanting: false,
  closingChanting: false,
  metta: false
};

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
        <Slider name="durationSlider" description="How long would you like to sit?" style={{color: "rgba(255, 255, 255, 1)", margin: "0px 40px 40px", height: 0}} onChange={this.changeDuration} />
        <Toggle name="introChantingToggle" value="introChanting" label="Include intro chanting?" onToggle={this.toggleIntroChanting} />
        <Toggle name="closingChantingToggle" value="closingChanting" label="Include closing chanting?" onToggle={this.toggleClosingChanting} />
        <Toggle name="mettaToggle" value="metta" label="Include extra time for metta?" onToggle={this.toggleMetta} />
        <RaisedButton label="Start" fullWidth={true} onClick={this.pressStart} />
      </Paper>
    );
  },

  changeDuration: function (e, value) {
    store.duration = value;
    console.log('changed duration:', value)
  },

  toggleIntroChanting: function (e, toggled) {
    store.introChanting = toggled;
    console.log('toggled introChanting:', toggled);
  },

  toggleClosingChanting: function (e, toggled) {
    store.closingChanting = toggled;
    console.log('toggled closingChanting:', toggled);
  },

  toggleMetta: function (e, toggled) {
    store.metta = toggled;
    console.log('toggled metta:', toggled);
  },

  pressStart: function () {
    console.log('pressed start:', store);
  }

});
