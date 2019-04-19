/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useState } from 'react'
import Chameleon from 'react-chameleon-theme-color'
import Helmet from 'react-helmet'
import useInterval from '@use-it/interval'
import { random } from 'chroma-js'

const App = () => {
  const randColor = () => random().toString()
  const [color, setColor] = useState(false)
  const [background, setBackground] = useState(false)
  useInterval(() => {
    setColor(randColor())
    setBackground(randColor())
  }, 1000)
  const full = css`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${background};
  `
  const inner = css`
    background: ${color};
    height: 500px;
    width: 100%;
  `
  return (
    <div css={full}>
      <Helmet
        title={'react-chameleon-theme-color'}
        htmlAttributes={{ lang: 'en' }}>
      </Helmet>
      <div css={inner}>
        <Chameleon />
      </div>
    </div>
  )
}

export default App
