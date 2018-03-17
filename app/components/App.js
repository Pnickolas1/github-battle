import React, { Component } from 'react'
var Popular = require('./Popular');

// a component is concerned about 3 things: 
//state
// lifecycle methods
// ui


class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <Popular />
      </div>
    )
  }
}

module.exports =  App; 