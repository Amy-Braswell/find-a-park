import React from 'react'
import { library }  from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

import SearchBar from '../Components/SearchBar/SearchBar'
import './App.css'

library.add(far, fas)


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


