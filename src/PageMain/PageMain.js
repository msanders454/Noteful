import React from 'react'
import Note from '../Note/Node'
import './PageMain.css'

export default class PageMain extends React.Component {
  
  render () {    
    return (
      <section className='PageMain'>
      <Note
        id={this.props.note.id}
        name={this.props.note.name}
        modified={this.props.note.modified}
        handleDeleteNote={() => this.props.history.push('/')}
      />
      <div className='PageMainContent'>
        {this.props.note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
}
}

PageMain.defaultProps = {
  note: {
    content: '',
  }

}