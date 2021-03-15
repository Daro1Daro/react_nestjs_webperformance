import React from 'react';
import { shallow } from 'enzyme';

import Header from './header.component';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Header/>);
})

it('expect to render Header component', () => {
  expect(wrapper).toMatchSnapshot();
});
