import React, { useState, useEffect, useRef } from 'react'
import Helmet from 'react-helmet'

const Chameleon = () => {
  const defaultColor = '#fff'
  const key = 'background'
  const [color, setColor] = useState(defaultColor)
  const container = useRef()
  useEffect(() =>{
    const getComputedStyle = (element) => window ? (element.parentNode ? window.getComputedStyle(element) : false) : false
    const getProperty = (element, property) =>  {
      const styles = getComputedStyle(element)
      return styles ? styles.getPropertyValue(property) : false
    }
    const trim = (value) => {
      // Regex to match HTML colors
      // https://gist.github.com/olmokramer/82ccce673f86db7cda5e#gistcomment-2029233
      if (!value) return false
      return value.match(/(#(?:[0-9a-f]{2}){2,4}|#[0-9a-f]{3}|(?:rgba?|hsla?)\((?:\d+%?(?:deg|rad|grad|turn)?(?:,|\s)+){2,3}[\s\/]*[\d\.]+%?\))/i)[0]
    }
    let cur = container.current
    while (cur && trim(getProperty(cur, key)) === 'rgba(0, 0, 0, 0)') {
      cur = cur.parentNode
    }
    const newColor = trim(getProperty(cur, key))
    setColor(newColor ? newColor : defaultColor)
  })
    return (
      <div ref={container}>
        <Helmet
          meta={[{ name: 'theme-color', content: color }]}>
        </Helmet>
      </div>
    )
}

export default Chameleon
