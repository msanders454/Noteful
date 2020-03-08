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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      folders: [],
      errorBoundaryKey: 0
    };
  }

componentDidMount() {
  Promise.all([fetch(`http://localhost:9090/notes`), fetch(`http://localhost:9090/folders`)])
    .then(([notesRes, foldersRes]) => {
      if (!notesRes.ok) return notesRes.json().then(e => Promise.reject(e));
      if (!foldersRes.ok)
        return foldersRes.json().then(e => Promise.reject(e));
      return Promise.all([notesRes.json(), foldersRes.json()]);
    })
    .then(([notes, folders]) => {
      folders.map(folder => {
        return this.handleAddFolder(folder);
      });
      notes.map(note => {
        return this.handleAddNote(note);
      });
    })
    .catch(error => {
      console.error({ error });
    });
}


handleDeleteNote = (noteId) => {
  this.setState({
    notes: this.state.notes.filter(note => note.id !== noteId)
  })
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

handleDeleteFolder = folderId => {
  this.setState({
    folders: this.state.folders.filter(folder => folder.id !== folderId)
  });
};

handleError = (error) => {
  this.setState({error})
  console.log('error')
}


  renderNavRoutes() {
    console.log(this.state);
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
    );
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
    let randomId = Math.random().toString(36).substring(2,9);
    console.log(randomId);
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      handleDeleteNote: this.handleDeleteNote,
      handleAddFolder: this.handleAddFolder,
      updateNote: this.updateNote,
      handleAddNote: this.handleAddNote,
      randomId: randomId,
      handleError: this.handleError,
      handleDeleteFolder: this.handleDeleteFolder
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