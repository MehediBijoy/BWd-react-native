/**
 * @format
 */

import 'react-native'
import React from 'react'
import {it} from '@jest/globals'
import renderer from 'react-test-renderer'

import App from '../src/App'

// Note: import explicitly to use the types shiped with jest.

// Note: test renderer must be required after react-native.

it('renders correctly', () => {
  renderer.create(<App />)
})
