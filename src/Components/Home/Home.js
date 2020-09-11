import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
        

export default function Home(props) {
    return(
    <div className ='home'>
        <header data-test="logo" className="Logo">
            <h1>Discover</h1>
            <h2>Our National Parks</h2>
        </header>

        <main className='App__main'>
          <div className="Search-Form" data-test="component-form">
            <SearchBar/>
          </div>
        </main>
    </div>
    )
}