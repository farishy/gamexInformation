import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../../Header';

test('header render', () => {
    const header = renderer
      .create(<Header data-testID={'header-loginSignup'}/>)
      .toJSON();
    expect(header).toMatchSnapshot();
  });
