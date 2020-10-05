import React from 'react'

import SearchBar from '../Components/SearchBar/SearchBar'
import './App.css'


export default function App() {

    return (
        <div data-test="app" className="App">
          <div className='bg_div'>
            <header data-test="logo" className="Logo">
              <h1>Discover</h1>
              <h2>Our National Parks</h2>
            </header>

            <main className='App__main'>
              <div data-test="component-form" className="Search-Form">
                <SearchBar/>
              </div>
            </main>
          </div>
        </div>
    )
  }


