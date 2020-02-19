import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddFolder from './AddFolder/AddFolder'
import AddNote from './AddNote/AddNote'
import ListNav from './ListNav/ListNav'
import PageNav from './PageNav/PageNav'
import ListMain from './ListMain/ListMain'
import PageMain from './PageMain/PageMain'
import NotesContext from './note-content';
import { findNote } from './notes-help'
import './App.css'

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  fetchFolders() {
    fetch('http://localhost:9090/folders')
    .then(res => res.json())
    .then(resjson => this.setState({folders: resjson}))
  }

  fetchNotes() {
    fetch('http://localhost:9090/notes')
    .then(res =>res.json())
    .then(resjson => this.setState({notes: resjson}))
  }

  deleteNotes = noteId => {
    const newNotes = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({notes: newNotes})
  }

 

  componentDidMount() {
    this.fetchFolders()
    this.fetchNotes()
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
    const { notes } = this.state
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={ListMain}
          />
        )}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params
            const note = findNote(notes, noteId)
            return (
              <PageMain
                {...routeProps}
                note={note}
              />
            )
          }}
        />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note'
          component={AddNote}
        />
      </>
    )
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote
    }

    
    return (
      <NotesContext.Provider value={contextValue}>
        <div className='App'>
          <nav className='AppNav'>
            {this.renderNavRoutes()}
          </nav>
          <header className='AppHeader'>
            <h1>
              <Link to='/'>Noteful</Link>
              {' '}
              <FontAwesomeIcon icon='check-double' />
            </h1>
          </header>
          <main className='AppMain'>
            {this.renderMainRoutes()}
          </main>
        </div>
      </NotesContext.Provider>
    )
  }
}

export default App