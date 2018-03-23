var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Popular = require('./Popular');
var Nav = require('./Nav')

// a component is concerned about 3 things: 
//state
// lifecycle methods
// ui


class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav />
          <Route path='/popular' component={Popular} />
        </div>
      </Router>
    )
  }
}

module.exports =  App; 