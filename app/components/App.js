const React = require('react');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Switch = ReactRouter.Switch;
const Nav = require('./Nav');
const Home = require('./Home');
const Battle = require('./Battle');
const Popular = require('./Popular');
const Results = require('./Results');

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
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/battle/results' component={Results} />
            <Route path='/popular' component={Popular} />
            <Route render={()  => <p> NOT FOUND </p>} />
          </Switch>
        </div>
      </Router>
    )
  }
}

module.exports =  App; 