import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  it('should render without crashing', () => {
    shallow(<LoginPage />);
  });

  it('should handle input change', () => {
    const wrapper = shallow(<LoginPage />);
    wrapper.find('input[name="email"]').simulate('change', { target: { name: 'email', value: 'test@test.com' } });
    expect(wrapper.state('email')).toEqual('test@test.com');
  });

  it('should handle form submission', () => {
    const wrapper = shallow(<LoginPage />);
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.instance().forceUpdate();
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(spy).toHaveBeenCalled();
  });
});
