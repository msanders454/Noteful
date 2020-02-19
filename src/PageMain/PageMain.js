import React from 'react'
import Note from '../Note/Node'
import './PageMain.css'

export default function PageMain(props) {
  return (
    <section className='PageMain'>
      <Note
        id={props.note.id}
        name={props.note.name}
        modified={props.note.modified}
        history={props.history}
        match={props.match}
      />
      <div className='PageMainContent'>
        {props.note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
}

PageMain.defaultProps = {
  note: {
    content: '',
  }
}