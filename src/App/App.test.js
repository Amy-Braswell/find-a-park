// npm test -- --coverage will run coverage report

import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr } from '../../test/testUtils'
import App from './App'

/**  
* Factory function to create a shallow wrapper for the App component
* @function setup
* @param {object} props - Component props specific to this setup.
* @param {any} state - Initial state for setup.
* @returns {ShallowWrapper}
*/
const setup = (props={}, state=null) => {
  const wrapper = shallow(<App {...props} />)
  if (state) wrapper.setState(state)
  return wrapper
} 

test('renders app without error', () => {
  const wrapper = setup()
  const app = findByTestAttr(wrapper, 'app')
  expect(app.length).toBe(1)
});

describe('renders all components', () => {
  const wrapper = setup()
  test('renders logo', () => {
    const logo = findByTestAttr(wrapper, 'logo')
    expect(logo.length).toBe(1)
  })
  test('renders form', () => {
    const form = findByTestAttr(wrapper, 'component-form')
    expect(form.length).toBe(1)
  })
})

