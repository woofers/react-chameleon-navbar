/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core'
import { useState } from 'react'
import { ChameleonThemeColor as Chameleon } from 'react-chameleon-theme-color'
import Helmet from 'react-helmet'
import useInterval from '@use-it/interval'
import { random } from 'chroma-js'

const App = () => {
  const randColor = () => random().toString()
  const [color, setColor] = useState(false)
  const [attrs, setAttrs] = useState(false)
  const [background, setBackground] = useState(false)
  const step = 2000
  const delay = 10
  useInterval(() => {
    setColor(randColor())
    setBackground(randColor())
    setTimeout(() => {
      const metas = fields => {
          const tags = Array.from(document.getElementsByTagName('meta'))
          return tags.filter(meta => {
              return fields.includes(meta.getAttribute('name'))
          })
      }
      let tags = metas(['theme-color', 'apple-mobile-web-app-status-bar-style', 'msapplication-navbutton-color'])
      tags = tags.map(meta => {
        return {
          name: meta.getAttribute('name'),
          value: meta.getAttribute('content')
        }
      }).sort((a, b) => a.name.localeCompare(b.name))
      setAttrs(tags)
    }, delay)
  }, step)
  const apple = () => {
    if (!attrs) return false
    for (const attr of attrs) {
      if (attr.name === 'apple-mobile-web-app-status-bar-style') return attr
    }
    return false
  }
  const useWhite = () => apple() ? apple().value !== 'default' : false
  const all = css`
    @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:300i,400,700&display=swap');
    * {
      font-family: 'IBM Plex Sans', sans-serif;
      line-height: 30px;
    }
    @media only screen and (max-width: 768px) {
      h1 {
        font-size: 21px;
      }
      div {
        font-size: 12px;
      }
    }
    ::selection {
      background: rgba(0, 132, 255, 0.4);
    }
  `
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
    color: ${useWhite() ? '#fff' : '#000'};
    padding: 100px 0;
    @media only screen and (max-width: 768px) {
      padding: 50px 0;
    }
  `
  const header = css`
    font-weight: 700;
  `
  const bold = css`
    font-weight: bold;
  `
  const italic = css`
    font-weight: 300;
    font-style: italic;
  `
  const container = css`
    display: flex;
    justify-content: space-between;
    text-align: left;
  `
  const start = css`
    align-content: flex-start;
    align-self: center;
  `
  const end = css`
    align-content: flex-end;
    align-self: center;
  `
  const max = css`
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    padding: 50px;
    @media only screen and (max-width: 768px) {
      max-width: 500px;
      padding: 25px;
    }
  `
  return (
    <div css={full}>
      <Global styles={all}/>
      <Helmet
        title={'react-chameleon-theme-color'}
        htmlAttributes={{ lang: 'en' }}>
      </Helmet>
      <div css={inner}>
        <Chameleon />
          <div css={max}>
            <h1 css={header}>react-chameleon-theme-color</h1>
            <div css={container}>
              <div css={start}>
              {attrs ? attrs.map(attr => {
                  return (<div key={attr.name} css={bold}>{attr.name}</div>)
              }) : null}
              </div>
              <div css={end}>
              {attrs ? attrs.map(attr => {
                const value = attr.value.startsWith('rgb') ? attr.value.toUpperCase() : attr.value
                return (<div key={attr.name + attr.value} css={italic}>{value}</div>)
              }) : null}
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default App
