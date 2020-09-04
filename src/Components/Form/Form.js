import React, { Component } from 'react'

import './Form.css'

export default class Form extends Component {
    constructor() {
        super()
        this.state = {
            error: null,
            parks: [],
            results: [],
            stateCode: null,
            stateCodeValid: null,
            stateCodeValidationMessage: null,
            limit: 50,
            limitValid: null,
            limitValidationMessage: null
        }
    }

    updateStateCode = (stateCode) => {
        this.setState({
            stateCodeValid: null, 
            limitValid: null,
            stateCode: stateCode
        }) 
    }

    isStateCodeValid = (e) => {
        e.preventDefault()
        if(!this.state.stateCode) {
            this.setState({
                stateCodeValidationMessage: 'You must enter a US State',
                stateCodeValid: false
            })
        } else if (this.state.stateCode.length !== 2) {
            this.setState({
                stateCodeValidationMessage: 'Please enter the two letter state code',
                stateCodeValid: false
            })
        } else {
            this.setState({
                stateCodeValidationMessage: null,
                stateCodeValid: true
            },
            () => {
                this.isSearchLimitValid(e)
              }
            )
        }
    }

    updateSearchLimit = (limit) => {
        this.setState({
            stateCodeValid: null, 
            limitValid: null,
            limit: limit, 
            })
    }

    isSearchLimitValid = (e) => {
        if(this.state.limit < 1 || this.state.limit > 50) {
            this.setState({
                limitValidationMessage: 'Please enter a number between 1 - 50',
                limitValid: false
            })
        } else {
            this.setState({
                limitValidationMessage: '',
                limitValid: true
            },
            () => {
                this.getParksByState()
              }
            )
        }
    }

    getParksByState = () => {
        this.setState({
            stateCodeValid: null, 
            limitValid: null,
            })
        
        const key = process.env.REACT_APP_API_KEY
        const searchURL = (process.env.REACT_APP_SEARCH_URL)
        const stateCode = this.state.stateCode
        const limit = this.state.limit

        let url=`${searchURL}?stateCode=${stateCode}&limit=${limit}&api_key=${key}`

        fetch(url)
        .then(res => {
            if (!res.ok) {
            throw new Error('Something went wrong, please try again later.')
            }
            return res
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
            parks: data.data,
            error: null
            })
            const resultArray = this.state.parks
              
            const results = resultArray.map(park => ({  
                photo: park.images[0] || null,
                name: park.name,
                state: park.states,
                url: park.url,
                directions: park.directionsInfo,
                description: park.description,
                })
            );
            this.setState({
                results:results
            })        
        })
        .catch(err => {
            this.setState({
            error: err.message
            })
        })
    }

    render(){
        return(
        <>
            <section className='SearchParks'>
                {this.state.stateCodeValid === false ? (
                        <div className='error__message_container' data-test='error-message-state-code-message'>
                            <p className='error__message'>{this.state.stateCodeValidationMessage}</p>
                        </div>
                ) : (
                    <div className='hidden' data-test='error-message-state-code-message'>
                    </div>
                )}

                {this.state.limitValid === false ? (
                        <div className='error__message_container' data-test='error-message-limit-message'>
                            <p className='error__message'>{this.state.limitValidationMessage}</p>
                        </div>
                ) : (
                    <div className='hidden' data-test='error-message-limit-message'>
                    </div>
                )}

                <form 
                    className='form-flexbox'
                    onSubmit={event => {
                        this.isStateCodeValid(event)
                      }}
                >
                    <div className='field form-group'>
                        <label htmlFor='state-code'>
                            <input
                                type='text'
                                data-test='state-code-input'
                                placeholder='Enter State (two letter code)'
                                className='search-this-state'
                                name='state-code'
                                aria-required='true'
                                onClick={event => this.updateStateCode(event.target.value)}
                                onChange={event => this.updateStateCode(event.target.value)}
                            />
                        </label>
                    </div>
                    <div className='field form-group'>
                        <label htmlFor='search-limit'>
                            <input
                                type='number'
                                data-test='search-limit-input'
                                placeholder='How Many Parks? (1 - 50)' 
                                className='search-limit'
                                name='search-limit'
                                aria-required='false'
                                onChange={event => this.updateSearchLimit(event.target.value)}
                            />
                        </label>
                    </div>
                    <div className='button form-submit'>
                        <button type='submit' data-test='submit-button'>
                            Submit
                        </button>
                    </div>

                </form>
            </section>
            <section className='SearchResults'>
                {this.state.results.length && 
                    (<div className="result-test">
                        <p>there are parks</p>
                    </div>
                )}
            </section>
        </>
 
    )}
}