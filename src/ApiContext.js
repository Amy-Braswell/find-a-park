import React from 'react'

const Context =  React.createContext({
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
})

export default Context