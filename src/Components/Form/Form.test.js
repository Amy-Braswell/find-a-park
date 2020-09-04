// STILL NEED TO WRITE TESTS FOR METHODS


import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr } from '../../../test/testUtils'
import Form from './Form'


/**  
* Factory function to create a shallow wrapper for the App component
* @function setup
* @param {object} props - Component props specific to this setup.
* @param {any} state - Initial state for setup.
* @returns {ShallowWrapper}
*/
const setup = (props={}, state=null) => {
    const wrapper = shallow(<Form {...props} />)
    if (state) wrapper.setState(state)
    return wrapper
  }


describe('renders all elements', () => {
    const wrapper = setup()
        test('renders state-code input', () => {
            const stateCode = findByTestAttr(wrapper,'state-code-input')
            expect(stateCode.length).toBe(1)
        })
        test('renders search-limit input', () => {
            const searchLimit = findByTestAttr(wrapper, 'search-limit-input')
            expect(searchLimit.length).toBe(1)
        })
        test('renders submit button', () => {
            const submitButton = findByTestAttr(wrapper, 'submit-button')
            expect(submitButton.length).toBe(1)
        }) 
})

describe('initial state', () => {
    test('initial state is as expected', ()=> {
        const wrapper = setup()
        expect(wrapper.state().error).toBe(null)
        expect(wrapper.state().parks).toEqual([])
        expect(wrapper.state().stateCode).toBe(null)
        expect(wrapper.state().stateCodeValid).toBe(null)
        expect(wrapper.state().stateCodeValidationMessage).toBe(null)
        expect(wrapper.state().limit).toBe(50)
        expect(wrapper.state().limitValid).toBe(null)
        expect(wrapper.state().limitValidationMessage).toBe(null)
    })

})

describe('returns no errors if entries are valid', () => {
    test('will show error if state.stateCodeValid is false', () => {
        const wrapper = setup(null, {stateCodeValid: false})
        const errorMessage = findByTestAttr(wrapper, 'error-message-state-code-message')
        expect(errorMessage.length).toBe(1)
    })
    test('will show error if state.limitValid is false', () => {
        const wrapper = setup(null, {limitValid: false})
        const errorMessage = findByTestAttr(wrapper, 'error-message-limit-message')
        expect(errorMessage.length).toBe(1)
    })
    test('will NOT show error if valid state code is entered', () => {
        const wrapper = setup(null, 
            {
                stateCode: 'WA', 
                stateCodeValid: true, 
                stateCodeValidationMessage: null
            })
        // find button and click
        const submitButton = findByTestAttr(wrapper, 'submit-button')
        submitButton.simulate('click')
        wrapper.update()
        // find error and check class
        const errorMessage = findByTestAttr(wrapper, 'error-message-state-code-message')
        const errorHasHiddenClass = errorMessage.hasClass('hidden')
        expect(errorHasHiddenClass).toBe(true)
    })
    test('will NOT show error if search limit is between 1 and 50', () => {
        const wrapper = setup(null, 
            {
                limit: 10, 
                limitValid: true, 
                limitValidationMessage: null
            })
        // find button and click
        const submitButton = findByTestAttr(wrapper, 'submit-button')
        submitButton.simulate('click')
        wrapper.update()
        // find error and check class
        const errorMessage = findByTestAttr(wrapper, 'error-message-limit-message')
        const errorHasHiddenClass = errorMessage.hasClass('hidden')
        expect(errorHasHiddenClass).toBe(true)
    })
})

describe('returns appropriate errors if value is not valid', () => {
    test('will show error if no state code is entered', () => {
        const wrapper = setup(null, 
            {
                stateCode: null, 
                stateCodeValid: false, 
                stateCodeValidationMessage: 'You must enter a US State'
            })
        const error = 'You must enter a US State'

        // find button and click
        const submitButton = findByTestAttr(wrapper, 'submit-button')
        submitButton.simulate('click')
        wrapper.update()

        // find error and test value
        const errorMessage = findByTestAttr(wrapper, 'error-message-state-code-message')
        expect(errorMessage.text()).toBe(error)
    })
    test('will show error if stateCode.length > 2', () => {
        const wrapper = setup(null, 
            {
                stateCode: 'Washington', 
                stateCodeValid: false, 
                stateCodeValidationMessage: 'Please enter the two letter state code'
            })
        const error = 'Please enter the two letter state code'

        // find button and click
        const submitButton = findByTestAttr(wrapper, 'submit-button')
        submitButton.simulate('click')
        wrapper.update()

        // find error and test value
        const errorMessage = findByTestAttr(wrapper, 'error-message-state-code-message')
        expect(errorMessage.text()).toBe(error)
    })
    test('will show error if search limit is below 1', () => {
        const wrapper = setup(null, 
            {
                limit: 0, 
                limitValid: false, 
                limitValidationMessage: 'Please enter a number between 1 - 50'
            })
        const error = 'Please enter a number between 1 - 50'

        // find button and click
        const submitButton = findByTestAttr(wrapper, 'submit-button')
        submitButton.simulate('click')
        wrapper.update()

        // find error and test value
        const errorMessage = findByTestAttr(wrapper, 'error-message-limit-message')
        expect(errorMessage.text()).toBe(error)
    })
    test('will show error if search limit is above 50', () => {
        const wrapper = setup(null, 
            {
                limit: 51, 
                limitValid: false, 
                limitValidationMessage: 'Please enter a number between 1 - 50'
            })
        const error = 'Please enter a number between 1 - 50'

        // find button and click
        const submitButton = findByTestAttr(wrapper, 'submit-button')
        submitButton.simulate('click')
        wrapper.update()

        // find error and test value
        const errorMessage = findByTestAttr(wrapper, 'error-message-limit-message')
        expect(errorMessage.text()).toBe(error)
    })    
})

