import React from 'react'
import './Circle.css'
import PropTypes from 'prop-types'

export default function Circle(props) {
  const { tag, className, children, ...otherProps } = props

  return React.createElement(
    props.tag,
    {
      className: ['Circle', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}


Circle.propTypes = {
  to: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string
}

Circle.defaultProps ={
  tag: 'a',
}



