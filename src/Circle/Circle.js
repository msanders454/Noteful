import React from 'react'
import './Circle.css'

export default function Circle(props) {
  const { tag, className, childrenm, ...otherProps } = props

  return React.createElement(
    props.tag,
    {
      className: ['Circle', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

Circle.defaultProps ={
  tag: 'a',
}