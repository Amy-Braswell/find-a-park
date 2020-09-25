import React from 'react'

import Card from '../Card/Card'
import './ResultList.css'


export default function ResultList(props){
    return(
        <div className='result-list' open={props.isResultListOpen}>

            <button data-test='close-button' className='close-button' onClick={props.handleClose}> 
                Close
            </button>

            <ul data-test='result-ul' className = 'ul--grid-container'>
                {props.results.map(park => (
                    <li data-test='card-as-li' className='li--grid-item' key={park.id}>
                        <Card
                        photo = {park.photo}
                        name = {park.name}
                        state = {park.state}
                        description = {park.description}
                        website = {park.url}
                        />             
                    </li> 
                ))}
            </ul>
        </div>
    )
    
}