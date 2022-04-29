import React from 'react'

import NPSLogo from '../../images/nps_logo.png'
import './Card.css'



export default function Card(props){
    const {photo, name, state, description, website} = props
    return(
        <div className='returned__park'>  
            <div data-test='park-card' className='returned-park-card'>                        
                
                <div data-test='park-image-div' className='returned-park-photo'>
                    {photo === null ?
                        <img data-test='park-image' src = {NPSLogo} alt='NPS-logo' className='logo'></img>
                        : <img data-test='park-image' src={photo.url} alt='park-detail' className='park-photo'></img>
                    }
                </div>

                <div data-test='park-details-div' className="details">
                    {name.length < 20 ?
                    <h2 data-test='park-name' className='returned-park-name'>{name}</h2>
                    : <h2 data-test='park-name' className='returned-park-name-long'>{name.substring(0,19)}...</h2>
                    }

                    {state.length < 26 ?
                    <h3 data-test='park-state' className='returned-park-state'>{state}</h3>
                    :
                    <h3 data-test='park-state' className='returned-park-state-long'>{state.substring(0,25)}...</h3>
                    }
                    <p data-test='park-description' className='returned-park-description'>{description}</p>

                </div>
                
                <footer>
                    <p data-test='park-website' className='returned-park-link'><a data-test='park-website-link' href={website} target="blank">Website</a></p>
                </footer>
            </div> 
        </div>
    )

}