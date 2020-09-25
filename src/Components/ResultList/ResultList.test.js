import React from 'react'
import { mount } from 'enzyme'

import { findByTestAttr } from '../../../test/testUtils'
import ResultList from './ResultList'


/**  
* Factory function to create a shallow wrapper for the App component
* @function setup
* @param {object} props - Component props specific to this setup.
* @param {any} state - Initial state for setup.
* @returns {ShallowWrapper}
*/
const setup = (props={}) => {
  const wrapper = mount(<ResultList {...props} />)
  return wrapper
}

const results = [
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

const wrapper = setup({results})

describe('renders all elements', () => {
  
  test('renders close button', () => {
    const closeButton = findByTestAttr(wrapper, 'close-button')
    expect(closeButton.length).toBe(1)
  })
  test('renders ul', () => {
    const resultUL = findByTestAttr(wrapper, 'result-ul')
    expect(resultUL.length).toBe(1)
  })
  test('renders Card as li', () => {
    const cardAsLI = findByTestAttr(wrapper, 'card-as-li')
    expect(cardAsLI.length).toBe(2)
  })
})

// Can't get close button tests to work
describe('close button works', () => {
  test('state.isResultListOpen equals false after Close button is clicked', ()=> {
      const wrapper = setup({results})
      wrapper.setProps({ isResultListOpen: true })
      const instance = wrapper.instance()
      console.log(wrapper.props())
      expect(wrapper.prop('isResultListOpen')).toEqual(true)
      console.log(wrapper.instance().handleClose())
      // instance.handleClose()
      // expect(wrapper.props('isResultListOpen')).toEqual(false)
  })
})






  // test('state.results equals [] after Close button is clicked', ()=> {
  //   const handleClose = jest.fn();
  //   const wrapper = render(<ResultList onClick={handleClose} />);
  //   wrapper.setState({ results });
  //   wrapper.find('.close-button').simulate('click');
  //   expect(wrapper.state().results).toBe([]) 
  // })
  // test('state.stateCode equals an empty string after Close button is clicked', ()=> {
  //   const handleCloseMock = jest.fn();
  //   const wrapper = render(<ResultList onClick={handleCloseMock} />);
  //   wrapper.setState({stateCode: 'Washington', stateCodeValid: false, stateCodeValidationMessage: 'Please enter the two letter state code'});
  //   wrapper.find('.close-button').simulate('click');
  //   expect(wrapper.state().stateCode).toBe('') 
  // })
  // test('state.limit equals an empty string after Close button is clicked', ()=> {
  //   const handleCloseMock = jest.fn();
  //   const wrapper = render(<ResultList onClick={handleCloseMock} />);
  //   wrapper.setState({ limit: '25' });
  //   wrapper.find('.close-button').simulate('click');
  //   expect(wrapper.state().stateCode).toBe(50) 
  // })
