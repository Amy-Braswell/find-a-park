import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import Context from '../ApiContext'

import Home from '../Components/Home/Home'
import ResultList from '../Components/ResultList/ResultList'
import './App.css'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      parks: [],
      results: [], 
    }
  }
  
  render() {
    const contextValue = {
      results: this.state.results,
    }
    return (
        <div data-test="app" className="App">
          <Context.Provider value={contextValue}>
            <Route
                exact
                path='/'
                component={Home}
              />
              <Route
                path='/results'
                component={ResultList}
              />
          </Context.Provider>
        </div>
    )
  }
}

export default App
