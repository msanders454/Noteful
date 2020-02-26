import React, { Component } from 'react'
import './AddNote.css'
import ValidationError from '../ValidationError/ValidationError'
import NotesContent from '../note-content';
import NoteForm from '../Form/noteform'

export default class AddNote extends Component {
  static contextType = NotesContent;

  constructor(props) {
    super(props);
    this.state = {
      noteName: '',
      content: '',
      folderId: '',
      noteNameValid: false,
      folderValid: false,
      formValid: false,
      validationMessage: {
        name: '',
        folder: ''
      }
    }
  }

  updateNoteName = (noteName) => {
    this.setState ({noteName}, () => this.validateName(noteName));
  }

  validateName = (noteName) => {
      let message = this.state.validationMessage.name;
      let hasError = false;
  
      noteName = noteName.trim();
      if(noteName.length === 0) {
        message = 'Must provide a Note Name';
        hasError = true;
      } else {
        if(noteName.length < 3) {
          message = 'Note name must be at least 3 characters long';
          hasError = true;
        } else {
          if (!noteName.match(new RegExp(/^([a-zA-Z0-9_-])*$/))) {
            message = 'Note name must use alphanumeric characters only'
            hasError = true;
          } else {
            message = '';
            hasError = false;
          }
        }
      }
      this.setState({
        noteNameValid: !hasError,
        validationMessage: {...this.state.validationMessage, name: message}
      }, () => this.formValid())
    }
    
    updateFolderId = (folderId) => {
      this.setState ({folderId}, () => this.validateFolderId(folderId));
    }

    updateContent = (content) => {
      this.setState ({content}, () => console.log('content updated'));
    }
    validateFolderId(folderId) {
      let message = this.state.validationMessage.folder;
      let hasError = false;
  
      if(folderId === null || folderId === "...") {
        message = 'Must choose an existing folder';
        hasError = true;
      }
      this.setState({
        folderValid: !hasError,
        validationMessage: {...this.state.validationMessage, folder: message}
      }, () => this.formValid())
    }
  addNewNote = (newNote) => {


    fetch('http://localhost:9090/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    })
      .then(() => this.props.history.push('/'))
      .catch(err => this.context.handleError(err))
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    const newNote = {
      id: this.context.randomId,
      name: this.state.noteName,
      modified: "2020-02-23T00:00:00.000Z",
      folderId: this.state.folderId,
      content: this.state.content
    }  
    console.log(newNote);
    this.addNewNote(newNote)
    this.context.handleAddNote(newNote);
  }

  formValid() {
    this.setState({
      formValid: this.state.noteNameValid && this.state.folderValid
    });
  }


  
  render() {
    const { folders } = this.context
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NoteForm onSubmit={e => this.handleFormSubmit(e)}>
          <div className='field'>
            <label htmlFor='noteName'>
              Name
            </label>
            <input type='text' id='note-name-input' onChange={ e => this.updateNoteName(e.target.value)}/>
          </div>
          <ValidationError hasError={!this.state.noteNameValid} message={this.state.validationMessage.name}/>
          <div className='field'>
            <label htmlFor='noteInput'>
              Content
            </label>
            <textarea id='note-content-input' onChange={ e => this.updateContent(e.target.value)}/>
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select' onChange={ e => this.updateFolderId(e.target.value)}>
              <option value={''}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <ValidationError hasError={!this.state.folderValid} message={this.state.validationMessage.folder}/>
          <div className='buttons'>
            <button type='submit' disabled={!this.state.formValid}>
              Add note
            </button>
          </div>
        </NoteForm>
      </section>
    )
  }
}