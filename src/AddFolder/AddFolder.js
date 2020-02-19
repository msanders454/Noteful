import React, { Component } from 'react'
import NoteForm from '../Form/noteform'
import './AddFolder.css'

export default class AddFolder extends Component {
  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NoteForm>
          <div className='NoteForm'>
            <label htmlFor='name'>
              Name
            </label>
            <input type='text' class='input' />
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
          </div>
        </NoteForm>
      </section>
    )
  }
}