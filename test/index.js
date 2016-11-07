import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { assert,expect } from 'chai';
require('locus');

import Application from '../lib/components/Application';
import NewContactForm from '../lib/components/NewContactForm';
import ContactCard from '../lib/components/ContactCard';
import ContactCardList from '../lib/components/ContactCardList';
import contactList from './helpers/fake-contacts.js';

describe("application", ()=>{
  it("should render as a div", ()=>{
    const wrapper = shallow(<Application/>);
    assert.strictEqual(wrapper.type(), 'div');
  }); //end of render as div
}); //end of describe application

describe("NewContactForm", ()=>{
  it("should change state when user enters info in a field", ()=>{
    const wrapper = mount(<NewContactForm numbers={{}} emails={{}} socialMedia={{}} fileReaderTest={"test"}/>);
    const firstNameInput = wrapper.find('.firstName-Input');
    assert.strictEqual(wrapper.state('firstName'), '');
    firstNameInput.simulate('change', {target: {value: 'Hello World'}});
    assert.strictEqual(wrapper.state('firstName'), 'Hello World');
  }); //end of change state when user enters info in a field

  it("should change state on entry of a more complex data item like cell phone number", ()=>{
    const wrapper = mount(<NewContactForm numbers={{}} emails={{}} socialMedia={{}} fileReaderTest={"test"}/>);
    const cellNumberInput = wrapper.find('.cellNumber-Input');

    assert.strictEqual(wrapper.state().numbers.cell, '');
    cellNumberInput.simulate('change', {target: {value: '99999999'}});
    assert.strictEqual(wrapper.state().numbers.cell, '99999999');
  });

}); // end of describe NewContactForm

describe("ContactCard", () => {
  console.log(contactList);
  const newContact = contactList[0];
  it("should display contact info when user enters it", () =>{

    const wrapper = mount(<ContactCard {...newContact} test = {true}/>);

    let name = wrapper.find('.fullname').text();
    assert.strictEqual(name, 'John Cleese');
  });

  it("should display all contact info when user clicks expand", ()=> {
    const wrapper = mount(<ContactCard {...newContact} test = {true}/>);
    wrapper.find('.expand-button').simulate('click');

    let name = wrapper.find('.fullname').text();
    assert.strictEqual(name, 'John Cleese');
    let cell = wrapper.find('.cell').text();
    assert.strictEqual(cell, 'Cell Number: 44');
    let primEmail = wrapper.find('.primary-email').text();
    assert.strictEqual(primEmail, 'Email 1: john@schoolofsillywalks.com');
    let github = wrapper.find('.github').text();
    assert.strictEqual(github, 'Github: jcleese');
  });

  it("should toggle off expand when user clicks expand button", () => {
    const wrapper = mount(<ContactCard {...newContact} test={true}/>);
    wrapper.find('.expand-button').simulate('click')

    let cell = wrapper.find('.cell').text();
    assert.strictEqual(cell, 'Cell Number: 44');

    wrapper.find('.expand-button').simulate('click');
    cell = wrapper.find('.cell');
    assert.strictEqual(cell.length, 0)
  });
  // it('should delete a contact when user presses delete contact', () => {
  //   const wrapper = mount(<ContactCard {...newContact} test={true}/>);
  //   const editButton = wrapper.find('.edit-button');
  //   editButton.simulate('click');
  //   const deleteButton = wrapper.find('.delete-contact');
  //   assert.strictEqual(wrapper.find('.cell').length, 0);
  // });
}); // end of describe ContactCard

describe('ContactCardList', () => {
  it('should change the state when user enters input into the search field', () => {
    const wrapper = mount(<ContactCardList contacts={['Hello', 'world']} />);
    const search = wrapper.find('.search');
    search.simulate('change', { target: { value: 'hello' } });
    assert.strictEqual(wrapper.state('searchString'), 'hello');
  });
  it('should allow user search to filter items on the page', () => {
    const wrapper = mount(<ContactCardList contacts={['Hello', 'world']} />);
    const search = wrapper.find('.search');
    search.simulate('change', { target: { value: 'z' } });
    assert.strictEqual(wrapper.find('.contact-card-for-each-contact').length, 0);
  });
  it('should sort contacts alphabetically by default', () => {
    const wrapper = mount(<ContactCardList contacts={[{firstName: 'Jerry', lastName: 'Seinfeld'}, {firstName: 'Bill', lastName: 'Clinton'}]} />);
    assert.strictEqual(wrapper.props().contacts.length, 2);
    assert.strictEqual(wrapper.find('.contact-card-container').text(), 'Show:Bill ClintonJerry Seinfeld');
  });
});
