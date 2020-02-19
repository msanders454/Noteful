import React, { Component } from 'react'
import NoteForm from '../Form/noteform'
import './AddNote.css'

export default class AddNote extends Component {
  static defaultProps = {
    folders: [],
  }
  
  render() {
    const { folders } = this.props
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NoteForm>
          <div className='field'>
            <label htmlFor='noteName'>
              Name
            </label>
            <input type='text' id='noteName' />
          </div>
          <div className='field'>
            <label htmlFor='noteInput'>
              Content
            </label>
            <textarea id='noteContent' />
          </div>
          <div className='field'>
            <label htmlFor='Select'>
              Folder
            </label>
            <select id='select'>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add note
            </button>
          </div>
        </NoteForm>
      </section>
    )
  }
}