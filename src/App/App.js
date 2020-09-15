import React, { Component } from 'react'

import SearchBar from '../Components/SearchBar/SearchBar'
import ResultList from '../Components/ResultList/ResultList'
import './App.css'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      parks: [],
      results: [],
      stateCode: null,
      stateCodeValid: null,
      stateCodeValidationMessage: null,
      limit: 50,
      limitValid: null,
      limitValidationMessage: null,
      loading: false,
    }
  }

  render() {
    return (
        <div data-test="app" className="App">
          <header data-test="logo" className="Logo">
            <h1>Discover</h1>
            <h2>Our National Parks</h2>
          </header>

          <main className='App__main'>
            {this.state.results.length ? 
              (
              <div className="result-list-container">
                <ResultList
                    results = {this.state.results} 
                />
              </div>
              )
            : 
              (
              <div className="Search-Form" data-test="component-form">
                <SearchBar/>
              </div>
              ) 
            }
          </main>
        </div>
    )
  }
}

export default App
