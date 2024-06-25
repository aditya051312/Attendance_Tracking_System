import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  it('renders without crashing', () => {
    shallow(<LoginPage />);
  });

  it('handles form submission', () => {
    const wrapper = shallow(<LoginPage />);
    const preventDefault = jest.fn();
    wrapper.find('form').simulate('submit', { preventDefault });
    expect(preventDefault).toBeCalled();
  });
});