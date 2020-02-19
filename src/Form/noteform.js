import React from 'react'


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