import React, {Component} from 'react'

import NPSLogo from '../../images/nps_logo.png'
import './Card.css'


export default class Card extends Component {

    render(){
        const {photo, name, state, description, directions, website} = this.props
        return(
            <div className='returned__park'>  
                <div className='returned-park-card'>                        
                <div className='returned-park-photo'>
                    {photo === null ?
                        <img src = {NPSLogo} alt='NPS-logo'></img>
                        : <img src={photo.url} alt='park-detail'></img>
                    }
                </div>

                <div className="details">
                    <h2 className='returned-park-name'>{name}</h2>

                    {state.length < 30 ?
                    <h3 className='returned-park-state'>{state}</h3>
                    :
                    <h3 className='returned-park-state'>{state.substring(0,29)}...</h3>
                    }
                    <p className='returned-park-text'>{description}</p>

                    <p className='returned-park-text'>{directions}</p>
                    <p className='returned-park-text'>{website}</p>

                </div>
                </div> 
            </div>
        )
    }
}