import React, { Component } from 'react'

import Form from '../Components/Form/Form.js'
import ApiContext from '../ApiContext'
import './App.css'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      results: false,
      loading: null,
      parks: []
    }

  }
  
  render() {
    return (
      <ApiContext.Provider value={{parks: this.state.parks}}>
      <div data-test="app" className="App">
        {this.state.results
          ? 
          (<header data-test="logo" className="Logo">
          </header>
          )
          :
          (<header data-test="logo" className="Logo">
              <h1>Discover</h1>
              <h2>Our National Parks</h2>
            </header>
          )
        }
        <main className='App__main'>
          {this.state.results 
            ? (<div className="Search-Form" data-test="component-form">
              </div>)
            :
            (<div className="Search-Form" data-test="component-form">
              <Form/>
            </div>)
          }
        </main>
      </div>
      </ApiContext.Provider>
    )
  }
}

export default App
