import React, { Component } from 'react'

import ResultList from '../ResultList/ResultList'
import './SearchBar.css'

export default class SearchBar extends Component {
    constructor(props) {
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
            limitValidationMessage: null,
            loading: false,
            isResultListOpen: false
        }
        this.inputStateCodeRef = React.createRef()
        this.inputLimitRef = React.createRef()
        this.isStateCodeValid = this.isStateCodeValid.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleClose = () =>{
        this.setState(
            { 
                isResultListOpen: false,
                results: [] 
            }
        )
        this.clearStateCodeInput()
        this.clearLimitInput()
    }

    updateStateCode = (stateCode) => {
        // How do I write test for Line 40?
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
                stateCodeValid: true,
            },
            () => {
                this.isSearchLimitValid(e)
              }
            )
        }
    }

    clearStateCodeInput = (e) => {
        this.inputStateCodeRef.current.value = ''
        this.setState({
            stateCode:''
        })
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

    clearLimitInput = (e) => {
        this.inputLimitRef.current.value = ''
        this.setState({
            limit: ''
        })
    }

    getParksByState = () => {
        this.setState({
            stateCodeValid: null, 
            limitValid: null,
            loading: true,
            parks: [],
            results: [],
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
        // .then(res => res.text())          
        // .then(text => console.log(text))
        .then(result => {
            this.setState({
            parks: result.data,
            error: null
            })
            const resultArray = this.state.parks
            // How do I write test for Line 142?  
            const results = resultArray.map(park => ({  
                id: park.id,
                photo: park.images[0] || null,
                name: park.name,
                state: park.states,
                url: park.url,
                description: park.description,
                })
            );
            // reset App to starting state except for results & isModalOpen
            // How do I write test for Line 153?
            this.setState({
                results:results, 
                parks: [],
                error: null,
                stateCode: null,
                stateCodeValid: null,
                stateCodeValidationMessage: null,
                limit: 50,
                limitValid: null,
                limitValidationMessage: null,
                loading: false,
                isResultListOpen: true
            })       
        })
        .catch(err => {
            // How do I write test for Line 169?
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
                            <div data-test='error-message-state-code-message' className='error__message_container'>
                                <p className='error__message'>{this.state.stateCodeValidationMessage}</p>
                            </div>
                    ) : (
                            <div data-test='error-message-state-code-message' className='hidden'>
                            </div>
                    )}

                    {this.state.limitValid === false ? (
                            <div data-test='error-message-limit-message' className='error__message_container'>
                                <p className='error__message'>{this.state.limitValidationMessage}</p>
                            </div>
                    ) : (
                            <div data-test='error-message-limit-message' className='hidden'>
                            </div>
                    )}
                     
                    {this.state.loading === true ? (                        
                           <div className='loading-container'>
                                <div  data-test='loading-message' className='loading'>
                                </div>
                            </div>
                    ) : (
                            <div data-test='no-loading-message' className='hidden'>
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
                                    data-test='state-code-input'
                                    label = 'state-code'
                                    ref={this.inputStateCodeRef}
                                    type='text'
                                    placeholder='Enter State (two letter code)'
                                    className='search-this-state'
                                    name='state-code'
                                    aria-required='true'
                                    onClick={event => this.clearStateCodeInput(event.target.value)}
                                    onChange={event => this.updateStateCode(event.target.value)}
                                />
                            </label>
                        </div>
                        <div className='field form-group'>
                            <label htmlFor='search-limit'>
                                <input
                                    data-test='search-limit-input'
                                    ref={this.inputLimitRef}
                                    type='number'
                                    placeholder='How Many Parks? (1 - 50)' 
                                    className='search-limit'
                                    name='search-limit'
                                    aria-required='false'
                                    onClick={event => this.clearLimitInput(event.target.value)}
                                    onChange={event => this.updateSearchLimit(event.target.value)}
                                />
                            </label>
                        </div>
                        <div className='button form-submit'>
                            <button type='submit' data-test='submit-button' className='submit'>
                                Submit
                            </button>
                        </div>

                    </form>
                </section>
                <section className='SearchResults'>
                    {this.state.results.length ?
                        (<div className="result-list-container">
                            <ResultList
                                results = {this.state.results} 
                                isResultListOpen={this.state.isResultListOpen} 
                                handleClose={this.handleClose}
                            />
                        </div>)
                        :
                        (<div className="no-result-list">
                        </div>)
                    }
                </section>
            </>
        )
    }
}


