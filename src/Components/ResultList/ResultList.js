import React from 'react'

import Card from '../Card/Card'
import './ResultList.css'



export default function ResultList(props){
    return(
        <div className='result-list' isOpen={props.isOpen}>

            <button onClick={props.handleClose}> 
                Close
            </button>

            <ul className = 'ul--grid-container'>
                {props.results.map(park => (
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