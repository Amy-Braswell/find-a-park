// npm test -- --coverage will run coverage report

// links will work
import React from 'react'
import {shallow} from 'enzyme'

import { findByTestAttr } from '../../../test/testUtils'
import Card from './Card'

/**  
* Factory function to create a shallow wrapper for the App component
* @function setup
* @param {object} props - Component props specific to this setup.
* @param {any} state - Initial state for setup.
* @returns {ShallowWrapper}
*/
const setup = (props={}, state=null) => {
    const wrapper = shallow(<Card {...props} />)
    if (state) wrapper.setState(state)
    return wrapper
  }

describe('renders all elements', () =>{

    const wrapper = setup({
        description: "Park description",
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
        }
    , null
    )

    test('renders park card', () => {
        const parkCard = findByTestAttr(wrapper,'park-card')
        expect(parkCard.length).toBe(1)
    })
    test('renders park image container', () => {
        const parkImageDiv = findByTestAttr(wrapper,'park-image-div')
        expect(parkImageDiv.length).toBe(1)
    })
    test('renders park details container', () => {
        const parkDetailsDiv = findByTestAttr(wrapper,'park-details-div')
        expect(parkDetailsDiv.length).toBe(1)
    })
    test('renders park image', () => {
        const parkImage = findByTestAttr(wrapper,'park-image')
        expect(parkImage.length).toBe(1)
    })
    test('renders park name', () => {
        const parkName = findByTestAttr(wrapper,'park-name')
        expect(parkName.length).toBe(1)
    })
    test('renders park state', () => {
        const parkState = findByTestAttr(wrapper,'park-state')
        expect(parkState.length).toBe(1)
    })
    test('renders park description', () => {
        const parkDescription = findByTestAttr(wrapper,'park-description')
        expect(parkDescription.length).toBe(1)
    })
    test('renders park website', () => {
        const parkWebsite = findByTestAttr(wrapper,'park-website')
        expect(parkWebsite.length).toBe(1)
    })
    test('renders link to park website', () => {
        const parkWebsiteLink = findByTestAttr(wrapper, 'park-website-link')
        expect(parkWebsiteLink.length).toBe(1)
    })
})

describe('renders correct image', () => {
        test('renders NPS Logo if no photo in database', () => {
            const wrapper = setup({
                description: "Park description",
                name: "Park Name",
                photo: null,
                state: "Park State",
                url: "Park Website"
                }
            , null
            )
            const NPSLogo = findByTestAttr(wrapper, 'park-image')
            expect(NPSLogo.hasClass('logo')).toEqual(true)
        })
        test('renders photo from database when one exists', () => {
            const wrapper = setup({
                description: "Park description",
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
                }
            , null
            )
            const parkPhoto = findByTestAttr(wrapper, 'park-image')
            expect(parkPhoto.hasClass('park-photo')).toEqual(true)
        })
})

describe('limits length when too long', () => {
    const wrapper = setup({
        description: "Park description",
        photo: 
            {
            altText: "alt-text-photo",
            caption: "photo caption",
            credit: "photo credit",
            title: "photo title",
            url: "photo url",
            },
        name: "I am a Super Long Park name", 
        state: "123456789012345678901234567890", 
        url: "Park Website"
        }
    , null
    )

    test('limits park name if over 20 characters', ()=> {
        const parkState = findByTestAttr(wrapper,'park-name')
        expect(parkState.hasClass('returned-park-name-long')).toEqual(true)
    })
    test('limits state name if over 30 characters', ()=> {
        const parkState = findByTestAttr(wrapper,'park-state')
        expect(parkState.hasClass('returned-park-state-long')).toEqual(true)
    })
})




