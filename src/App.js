import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import Header from './Header/Header';
import Home from './Home/Home'
import FolderNav from './FolderNav/FolderNav';
import NoteNav from './NoteNav/NoteNav';
import NoteContext from './NoteContext'
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import ErrorBoundary from './ErrorBoundary/ErrorBoundry';


class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    newNote: {
      value: "",
      touched: false,
      content: "",
      folderId: "1",
    },
    newFolder: {
      value: "",
      touched: false
    },
  }

  componentWillMount(){
    fetch(`https://desolate-inlet-63627.herokuapp.com/api/folders`)
    .then(response => response.json())
    .then(folders => this.setState({folders}))

    fetch(`https://desolate-inlet-63627.herokuapp.com/api/notes`)
    .then(response => response.json())
    .then(notes => this.setState({notes}))
  };


  updateFolder = (name) => {
    this.setState({ newFolder: { value: name, touched: true } })
  };

  handleAddFolder = (event) => {
    event.preventDefault();
    const opts = { name: this.state.newFolder.value}
    
    try{
    fetch('https://desolate-inlet-63627.herokuapp.com/api/folders', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(opts)
    }).then(() =>
    
    fetch(`https://desolate-inlet-63627.herokuapp.com/api/folders`)
    .then(response => response.json())
    .then(folders => this.setState({folders}))
    .then(() => console.log(this.state)))
    }catch(error){
      console.error(error)
    }

    this.props.history.push('/');
  };

  updateNote = (name) => {
    let newName = this.state.newNote;
    newName.value = name;
    newName.touched = true;
    this.setState({ newNote: newName})
  }

  updateNoteFolder = (id) => {
    let newFolderId = this.state.newNote;
    newFolderId.folderId = id;
    this.setState({ newNote: newFolderId})
  }

  updateNoteContent = (content) => {
    let newContent = this.state.newNote;
    newContent.content = content;
    this.setState({ newNote: newContent })
  }

  validateFolder(){
    if(this.state.newFolder.touched && this.state.newFolder.value < 1){
      return 'Folder is empty. Please add anything'
    }
    return <></>
  }

  validateNote(){
    if(this.state.newNote.touched && this.state.newNote.value < 1){
      return 'Note is empty. Please add anything'
    }
    return <></>
  }


  handleAddNote = (event) => {
    event.preventDefault();
    let note = this.state.newNote
    const opts = {name: note.value, folderid: note.folderId, content: note.content}
    
    try{
      fetch('https://desolate-inlet-63627.herokuapp.com/api/notes', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(opts)
      }).then(() =>
      
      fetch(`https://desolate-inlet-63627.herokuapp.com/api/notes`)
      .then(response => response.json())
      .then(notes => this.setState({notes})))

    } catch(error) {
      console.error(error)
    }
    
    this.props.history.push('/');
  }

  deleteNote = (noteId) => {
    fetch(`https://desolate-inlet-63627.herokuapp.com/api/notes/${noteId}`, {
    method: 'DELETE',
    headers: {
    'content-type': 'application/json'
    },
  })
    let newNotes = this.state.notes.filter(note => note.id !== noteId)

    this.setState({notes: newNotes})
  }

  render(){
    return (
      <NoteContext.Provider value={{
        folders: this.state.folders,
        notes: this.state.notes, 
        deleteNote: this.deleteNote,
        }}>
      <div className='App'>
        < Header />
        <ErrorBoundary>
        < Switch >
          < Route path="/" exact render={() => < Home notes={this.state.notes}/>} />
          < Route path="/folder/:id" exact render={(props) => < FolderNav id={props.match.params.id}/>} />
          < Route path="/notes/:id" render={(props) => < NoteNav onBackClick={() => props.history.goBack()} id={props.match.params.id}/>} />
          < Route path="/addFolder" render={() => <AddFolder handleAddFolder={this.handleAddFolder} updateFolder={this.updateFolder} validateFolder={this.validateFolder()}/>}/>
          < Route path="/addNote" render={() => <AddNote handleAddNote={this.handleAddNote} updateNote={this.updateNote} updateNoteFolder={this.updateNoteFolder} updateNoteContent={this.updateNoteContent} validateNote={this.validateNote()}/>}/>
        </Switch>
        </ErrorBoundary>
      </div>
      </NoteContext.Provider>
    );
  }
}

export default withRouter(App);