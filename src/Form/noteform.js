import React from 'react'
import './noteform.css'

export default function NoteForm(props) {
  const { className, ...otherProps } = props
  return (
    <form
      className={['NoteForm', className].join(' ')}
      action='#'
      {...otherProps}
    />
  )
}
