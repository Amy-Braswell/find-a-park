import React, {Component} from 'react'
import SearchBar from '../SearchBar/SearchBar'
import ResultList from '../ResultList/ResultList'
        

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      parks: [],
      results: [], 
    }
  }
  
  render() {
    return(
    <div className ='home'>
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