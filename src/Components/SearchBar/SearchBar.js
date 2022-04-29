import React, { Component } from 'react'

import ResultList from '../ResultList/ResultList'
import {Button, Col, Form} from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'
import './SearchBar.css'

export default class SearchBar extends Component {
    constructor(props) {
        super()
        this.state = {
            error: null,
            alert: false,
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

    handleAlertClose = () =>{
        this.setState(
            { 
                alert: false,
                error: null 
            }
        )
        this.clearStateCodeInput()
        this.clearLimitInput()
    }

    updateStateCode = (stateCode) => {
        // Write test for Line 40
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
                stateCodeValid: false,
                alert: true
            })
        } else if (this.state.stateCode.length !== 2) {
            this.setState({
                stateCodeValidationMessage: 'Please enter the two letter state code',
                stateCodeValid: false,
                alert: true
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
                limitValid: false, 
                alert: true
            })
        } else {
            this.setState({
                limitValidationMessage: '',
                limitValid: true,
                alert: true
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
            // Write test for Line 142  
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
            // Write test for Line 153
            this.setState({
                results:results, 
                parks: [],
                error: null,
                alert: false,
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
            // Write test for Line 169
            this.setState({
            error: err.message,
            alert: true
            })
        })
    }


    render(){
        return(
            <>
                <section className='SearchParks'>
                    {this.state.stateCodeValid === false && this.state.alert === true ? (
                            <Alert 
                                key="danger" 
                                variant="danger" 
                                bsPrefix="alert-msg"
                                data-test='error-message-state-code-message'
                                >
                                    {this.state.stateCodeValidationMessage}
                                    <p className="alert-close" onClick={() => this.handleAlertClose()} >x</p>
                            </Alert>
                    ) : (
                            <div data-test='error-message-state-code-message' className='hidden'>
                            </div>
                    )}

                    {this.state.limitValid === false && this.state.alert === true ?(
                            <Alert 
                                key="danger" 
                                variant="danger" 
                                bsPrefix="alert-msg"
                                data-test='error-message-limit-message' 
                            >
                                {this.state.limitValidationMessage}
                                <p className="alert-close" onClick={() => this.handleAlertClose()} >x</p>
                            </Alert>
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

                   
                {/* Desktop Form */}
                    <Form 
                        className="form-desktop"
                        onSubmit={event => {
                            this.isStateCodeValid(event)
                        }}
                    >
                        <Col className="my-1" style={{ width: '35%', margin: '0', padding: '0' }}>
                            <Form.Group className="" controlId="formStateCode">
                                <Form.Label className="visually-hidden">two letter State Code</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter State (two letter code)" 
                                    bsPrefix="styled-input" 
                                    data-test='state-code-input'
                                    ref={this.inputStateCodeRef}
                                    name='state-code'
                                    aria-required='true'
                                    onClick={event => this.clearStateCodeInput(event.target.value)}
                                    onChange={event => this.updateStateCode(event.target.value)}
                                />
                            </Form.Group>
                        </Col>

                        <Col className="my-1" style={{ width: '35%', margin: '0', padding: '0' }}>
                            <Form.Group className="" controlId="formSearchLimit">
                                <Form.Label className="visually-hidden">Search Limit</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder="How Many Parks? (1 - 50)" 
                                    bsPrefix="styled-input"
                                    data-test='search-limit-input'
                                    ref={this.inputLimitRef}
                                    name='search-limit'
                                    aria-required='false'
                                    onClick={event => this.clearLimitInput(event.target.value)}
                                    onChange={event => this.updateSearchLimit(event.target.value)}
                                />
                            </Form.Group>
                        </Col>

                        <Col className="my-1" style={{ width: '30%', margin: '0', padding: '0' }}>
                            <Button  className="" type="submit" bsPrefix="btn-flat" data-test='submit-button'>
                                Submit
                            </Button>
                        </Col>

                    </Form>

                {/* MOBILE FORM */}
                    <Form 
                        className="form-mobile"
                        onSubmit={event => {
                            this.isStateCodeValid(event)
                        }}
                    >
    
                        <Col className="mt-4 mb-2" style={{ width: '100%', padding: '0' }}>
                            <Form.Group className="" controlId="formStateCode">
                                <Form.Label className="visually-hidden">two letter State Code</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter State (two letter code)" 
                                    bsPrefix="styled-input" 
                                    data-test='state-code-input'
                                    ref={this.inputStateCodeRef}
                                    name='state-code'
                                    aria-required='true'
                                    onClick={event => this.clearStateCodeInput(event.target.value)}
                                    onChange={event => this.updateStateCode(event.target.value)}
                                />
                            </Form.Group>
                        </Col>
           
                        <Col className="mb-2" style={{ width: '100%', padding: '0' }}>
                            <Form.Group className="" controlId="formSearchLimit">
                                <Form.Label className="visually-hidden">Search Limit</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder="How Many Parks? (1 - 50)" 
                                    bsPrefix="styled-input"
                                    data-test='search-limit-input'
                                    ref={this.inputLimitRef}
                                    name='search-limit'
                                    aria-required='false'
                                    onClick={event => this.clearLimitInput(event.target.value)}
                                    onChange={event => this.updateSearchLimit(event.target.value)}
                                />
                            </Form.Group>
                        </Col>
  
                        <Col className="mb-2" style={{ width: '100%', padding: '0' }}>
                            <Button  className="" type="submit" bsPrefix="btn-flat" data-test='submit-button'>
                                Submit
                            </Button>
                        </Col>
                       

                    </Form>

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


