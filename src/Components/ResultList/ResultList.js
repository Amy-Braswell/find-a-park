import React from 'react'
import { Link } from 'react-router-dom'

import Card from '../Card/Card'
import './ResultList.css'



export default function ResultList(props) {

    const results = props.results
    // const [open, setOpen] = React.useState(true)

    // const [loading, setLoading] = React.useState(true)
    return(
        <div>
            {/* <button
                className = 'button-close'
                onMouseEnter={() => setLoading(!loading)} 
                onClick={() => { setOpen(!open)}}
            >
            X -- Close
            </button> */}
            <Link 
                className = 'button-close' 
                to={'/'}
            >
                Close
            </Link>
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