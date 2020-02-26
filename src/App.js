import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddFolder from './AddFolder/AddFolder'
import AddNote from './AddNote/AddNote'
import ListNav from './ListNav/ListNav'
import PageNav from './PageNav/PageNav'
import ListMain from './ListMain/ListMain'
import PageMain from './PageMain/PageMain'
import NotesContent from './note-content'
import './App.css'
import ErrorBound from './ErrorBound/ErrorBound'

class App extends Component {
  state = {
    notes: [],
    folders: [],
    error: null,
};

async componentDidMount() {
  const [folderMount, notesMount] = [await fetch('http://localhost:9090/folders'), await fetch('http://localhost:9090/notes')]

  try {
    const folders = await folderMount.json();
    const notes = await notesMount.json();
    console.log(this.state);
    this.setState({
     notes,
     folders,
     error: null,
   })
  } catch(err) {
    this.setState({error: err.message})
  }
}

handleDeleteNote = (noteId) => {
  return fetch(`http://localhost:9090/notes/${noteId}`, {method: "DELETE"})
}

updateNote = (noteId) => {
  this.setState({
    notes: this.state.notes.filter(note => note.id !== noteId)
  })
}

randomId = () => {
  return Math.random().toString(36).substr(2,9);
 // let randomId = (random + "-ffaf-11e8-8eb2-f2801f1b9fd1")
  //return randomId;
}

handleAddFolder = (newFolder) => {
  this.setState({
    folders: [...this.state.folders, newFolder],
  })
}

handleAddNote = note => {
  this.setState({
    notes: [...this.state.notes, note],
  })
}

handleError = (error) => {
  this.setState({error})
  console.log('error')
}


  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={ListNav}
          />
        )}
        <Route
          path='/note/:noteId'
          component={PageNav}
        />
        <Route
          path='/add-folder'
          component={PageNav}
        />
        <Route
          path='/add-note'
          component={PageNav}
        />
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
      {['/', '/folder/:folderId'].map(path =>
          <Route exact key={path} path={path} component={ListMain}/>
        )}
        <Route path="/note/:noteId" component={PageMain} />
        <Route path="/add-folder" component={AddFolder} />
        <Route path="/add-note" component={AddNote} />
      </>
    )
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      handleDeleteNote: this.handleDeleteNote,
      handleAddFolder: this.handleAddFolder,
      updateNote: this.updateNote,
      handleAddNote: this.handleAddNote,
      randomId: this.randomId,
      handleError: this.handleError
    }

 
   
    return (
      <NotesContent.Provider value = {contextValue}>
        <div className='App'>
        <ErrorBound>
          <nav className='AppNav'>
            {this.renderNavRoutes()}
          </nav>
          </ErrorBound>
          <header className='AppHeader'>
            <h1>
              <Link to='/'>Noteful</Link>
              {' '}
              <FontAwesomeIcon icon='check-double' />
            </h1>
          </header>
          <ErrorBound>
          <main className='AppMain'>
            {this.renderMainRoutes()}
          </main>
          </ErrorBound>
        </div>
      </NotesContent.Provider>
    )
  }
}

export default App