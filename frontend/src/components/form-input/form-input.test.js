import React from 'react';
import { shallow } from 'enzyme';

import FormInput from './form-input.component';

it('expect to render FormInput component', () => {
  expect(shallow(<FormInput/>).length).toEqual(1);
});