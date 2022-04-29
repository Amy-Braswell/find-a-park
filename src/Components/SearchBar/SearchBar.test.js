// "npm test -- --coverage" will run coverage report

import React from 'react'
import { mount, shallow } from 'enzyme'
import moxios from 'moxios'

import { findByTestAttr } from '../../../test/testUtils'
import SearchBar from './SearchBar'


/**  
* Factory function to create a shallow wrapper for the App component
* @function setup
* @param {object} props - Component props specific to this setup.
* @param {any} state - Initial state for setup.
* @returns {ShallowWrapper}
*/
const setup = (props={}, state=null) => {
    const wrapper = shallow(<SearchBar {...props} />)
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
    expect(wrapper.state().loading).toBe(false)
    expect(wrapper.state().isResultListOpen).toBe(false)
})

describe('state will update as user uses form', () => {
    const wrapper = setup(null, { stateCode: '', limit: 50 })
    test('entering text in State input will update state.stateCode', () => {
        // find input and enter value
        const stateCodeInput = findByTestAttr(wrapper, 'state-code-input')
        stateCodeInput.simulate('change', {target: {value: 'WA'}})
        expect(wrapper.state().stateCode).toBe('WA')
    })
    test('entering a number in Limit input will update state.limit', () => {
        // find input and enter value
        const stateCodeInput = findByTestAttr(wrapper, 'search-limit-input')
        stateCodeInput.simulate('change', {target: {value: 10}})
        expect(wrapper.state().limit).toBe(10)
    })
    test('clicking in State input will update state.stateCode', () => {
        const clearStateCodeInputMock = jest.fn();
        const wrapper = mount(<SearchBar onClick={clearStateCodeInputMock} />);
        wrapper.setState({stateCode: 'Washington', stateCodeValid: false, stateCodeValidationMessage: 'Please enter the two letter state code'});
        wrapper.find('.search-this-state').simulate('click');
        expect(wrapper.state().stateCode).toBe('') 
    })
    test('clicking in Limit input will update state.limit', () => {
        const clearLimitInputMock = jest.fn();
        const wrapper = mount(<SearchBar onClick={clearLimitInputMock} />);
        wrapper.setState({ limit: 75 });
        wrapper.find('.search-limit').simulate('click');
        expect(wrapper.state().limit).toBe('') 
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

describe('Validation messages get set', ()=> {
    test('isStateCodeValid', () => {
        const isStateCodeValidMock = jest.fn();
        const wrapper = mount(<SearchBar onSubmit={isStateCodeValidMock} />);
        wrapper.setState({stateCode: 'WA'});
        const submitButton = findByTestAttr(wrapper, 'submit-button')
        expect(submitButton.length).toBe(1)
        submitButton.simulate('submit');
        expect(wrapper.state().stateCodeValidationMessage).toBe(null) 
    })
    test('isLimitValid', () => {
        const isStateCodeValidMock = jest.fn();
        const wrapper = mount(<SearchBar onSubmit={isStateCodeValidMock} />);
        wrapper.setState({stateCode: 'WA', stateCodeValid: true, stateCodeValidationMessage: null, limit: 25 });
        const submitButton = findByTestAttr(wrapper, 'submit-button')
        expect(submitButton.length).toBe(1)
        submitButton.simulate('submit');
        expect(wrapper.state().limitValidationMessage).toBe('') 
    })
})

describe('server shows loading spinner and then results', () => {
    test('will show loading upon submit', () => {
        const wrapper = setup(null, 
            {   
                parks: [],
                results: [],
                stateCode: 'WA',
                stateCodeValid: true,
                stateCodeValidationMessage: null,
                limit: 50,
                limitValid: true,
                limitValidationMessage: null,
                loading: true
            })
        // find button and click
        const submitButton = findByTestAttr(wrapper, 'submit-button')
        submitButton.simulate('click')
        // test that state.loading is true
        expect(wrapper.state().loading).toBe(true)
        // find loading message and test value
        const loadingMessage = findByTestAttr(wrapper, 'loading-message')
        expect(loadingMessage.length).toBe(1)
    })

    test('server returns results', () => {
        const STORE = [
            {id: "1",
            description: "Park description",
            directions: "Park Directions",
            photo: 
                {
                altText: "alt-text-photo",
                caption: "photo caption",
                credit: "photo credit",
                title: "photo title",
                url: "photo url",
                },
            name: "Park Name", 
            state: "Park State", 
            url: "Park Website"
            },
            {id: "2",
            description: "Park description",
            directions: "Park Directions",
            name: "Park Name",
            photo: null,
            state: "Park State",
            url: "Park Website"
            }
        ]
        
        beforeEach(() => {
            moxios.install()
        })
        afterEach(() => {
            moxios.uninstall()
        })
        
        const results = STORE

        const wrapper = setup(null, 
            {   
                parks: [],
                results: [],
                stateCode: 'WA',
                stateCodeValid: true,
                stateCodeValidationMessage: null,
                limit: 50,
                limitValid: true,
                limitValidationMessage: null,
                loading: true
            })
  
        const submitButton = findByTestAttr(wrapper, 'submit-button')
        submitButton.simulate('click')

        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: results,
            })
            // the data that comes back needs to look like the store
            .then(data =>{
                expect(wrapper.state().results).toEqual(STORE)
            })
        })    
    })
})





