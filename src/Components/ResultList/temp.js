import React, { Component } from 'react'

import Card from '../Card/Card'
import './ResultList.css'



export default class ResultList extends Component {

    constructor(props){
        super(props)
        this.setState({
            open: true
        })
    }

    handleCloseButtonClick = (e) => {
        this.setState({
            open: false,
            parks: [],
            results: [],
            loading: false,
        })
    }
    render (){
        let results = this.props.results
        return(
            <div className = {this.class.open ? 'result-list' : 'hidden'}>
                <button
                    className = 'button-close' 
                    onClick={() => {this.handleCloseButtonClick()}}>X  Close
                </button>
                <ul className = 'ul--grid-container'>
                    {results.map(park => ( 
                        <li className='li--grid-item' key={park.id}>
                            <Card
                            photo = {park.photo}
                            name = {park.name}
                            state = {park.state}
                            description = {park.description}
                            directions = {park.directionsInfo}
                            website = {park.url}
                            />             
                        </li> 
                    ))}
                </ul>
            </div>
        )
    }
}