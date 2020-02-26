import React, { Component } from 'react'
import NoteForm from '../Form/noteform'
import './AddFolder.css'
import NotesContent from '../note-content';
import ValidationError from '../ValidationError/ValidationError'

export default class AddFolder extends Component {
  static contextType = NotesContent;

  constructor(props) {
    super(props);
    this.state = {
      folderName: '',
      folderNameValid: false,
      validationMessage: ''
    }
  }

  updateFolderName = (folderName) => {
    this.setState ({folderName}, () => this.validateFolderName(folderName));
  }

  
  validateFolderName(folderName) {
    let message = this.state.validationMessage;
    let hasError = false;
    folderName = folderName.trim();
    if (folderName.length === 0) {
      message = 'Error Must add more characters'
      hasError = true;
    } else {
      if(folderName.length < 3) {
        message = 'Folder name must be at least 3 characters long';
        hasError = true;
      } else {
        if (!folderName.match(new RegExp(/^([a-zA-Z0-9_-])*$/))) {
          message = 'Folder name must use alphanumeric characters only'
          hasError = true;
        } else {
          message = '';
          hasError = false;
        }
      }
    }

    this.setState({
      folderNameValid: !hasError,
      validationMessage: message
    })
  }

  addFolderApi = (newFolder) => {
    fetch('http://localhost:9090/folders', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(newFolder)
      }
    )
    .then(() => this.props.history.push('/'))
    .catch(err => this.context.handleError(err))
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    console.log(this.context)
    const newFolder = {
      id: this.context.randomId,
      name: this.state.folderName,
    };
    this.addFolderApi(newFolder);
    this.context.handleAddFolder(newFolder)
  }


  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NoteForm onSubmit={e => this.handleSubmit(e)}>
          <div className='NoteForm'>
            <label htmlFor='newFolder'>
              Name
            </label>
            <input type='text' className='input' onChange={ e => this.updateFolderName(e.target.value)}/>
          </div>
          <ValidationError hasError={!this.state.folderNameValid} message={this.state.validationMessage}/>
          <div className='buttons'>
            <button type='submit' disabled={!this.state.folderNameValid}>
              Add folder
            </button>
          </div>
        </NoteForm>
      </section>
    )
  }
}