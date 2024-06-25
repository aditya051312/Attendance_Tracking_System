import React from 'react';
import { shallow } from 'enzyme';
import Login from './login';

describe('Login', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Login />);
  });

  it('renders the email input', () => {
    expect(wrapper.find('input[type="email"]').length).toEqual(1);
  });

  it('renders the password input', () => {
    expect(wrapper.find('input[type="password"]').length).toEqual(1);
  });

  it('renders the submit button', () => {
    expect(wrapper.find('button[type="submit"]').length).toEqual(1);
  });
});