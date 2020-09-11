import React from 'react'
import { shallow } from 'enzyme'
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { findByTestAttr } from '../../../test/testUtils'
import ResultList from './ResultList'

import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import renderer from 'react-test-renderer';

/**  
* Factory function to create a shallow wrapper for the App component
* @function setup
* @param {object} props - Component props specific to this setup.
* @param {any} state - Initial state for setup.
* @returns {ShallowWrapper}
*/
// const setup = (props={}, state=null) => {
//   const wrapper = shallow(<ResultList {...props} />)
//   if (state) wrapper.setState(state)
//   return wrapper
// }


//describe('Card Test Suite', () => {
  // //Smoke Test
  // it('renders without crashing', () => {
  //     // start by creating an element to render the component into
  //     const div = document.createElement('div');
  //     ReactDOM.render(<List 
  //         key={STORE.list.id}
  //         header={STORE.list.header}
  //         cards={STORE.list.cardIds}
  //         />,  
  //         div); 
  //     ReactDOM.unmountComponentAtNode(div);
  // });

  //Snapshot Test
//   it('renders the UI as expected', () => {
//       const tree = renderer
//           .create(<List 
//               key={STORE.list.id}
//               header={STORE.list.header}
//               cards={STORE.list.cardIds}
//           />) 
//           .toJSON();
//       expect(tree).toMatchSnapshot();

//   });
// });




describe('renders cards when results are returned', () => {
  //   const mockState = `results: [
  //   {
  //   description: "description",
  //   directions: "directions",
  //   id: "id-1",
  //   name: "name",
  //   photo:{url: "https://www.nps.gov/common/uploads/structured_data/3C84BC00-1DD8-B71B-0BD2CA9CA44675E9.jpg"},
  //   state: "WA",
  //   url: "https://www.nps.gov/ebla/index.htm"
  //   },

  //   {  
  //   description: "description",
  //   directions: "directions",
  //   id: "id-2",
  //   name: "name",
  //   photo:{url: "https://www.nps.gov/common/uploads/structured_data/3C7E8577-1DD8-B71B-0B5ABB3F175DDD81.jpg"},
  //   state: "WA",
  //   url: "https://www.nps.gov/ebla/index.htm"
  //   }
  // ]`

  // const wrapper = setup(null, mockState)

test('renders all elements', () => {

  })

})

test('renders NPS Logo if no photo in park info', () => {

})

test('links in park details work', () => {

})

test('state.loading equals false after Close button is clicked', ()=> {

})