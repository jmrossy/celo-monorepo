// import * as React from 'react'
import BlueBanner from 'src/header/BlueBanner'
import * as TestRenderer from 'react-test-renderer'

describe(BlueBanner, () => {
  const test = TestRenderer.create(<BlueBanner />)

  expect(test.toTree()).toEqual({})
})
