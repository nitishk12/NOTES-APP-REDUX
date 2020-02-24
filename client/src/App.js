import React from 'react'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'
import { connect } from 'react-redux'
import { startRemoveUser } from './actions/usersAction'
import NoteList from './components/notes/NoteList'
import CategoriesList from './components/categories/CategoriesList'
import NoteCreate from './components/notes/NoteCreate'
import NoteShow from './components/notes/NoteShow'
import EditNote from './components/notes/EditNote'
import CategoryView from './components/categories/CategoryView'
import CategoryEdit from './components/categories/CategoryEdit'
import Swal from 'sweetalert2'

function App(props) {

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ok'
    }).then((result) => {
      if (result.value) {
        props.dispatch(startRemoveUser())
        Swal.fire(
          'Logged out',
          'you have been successfully logged out.',
          'success'
        )
      }
    })

  }

  return (
    <div>
      <BrowserRouter>
        {
          Object.keys(props.user).length > 0 ? (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <a className="navbar-brand" href="/">Notes App</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav">
                  <div>
                    <Link to="/home" >HOME </Link>
                    <Link to="/notes" >NOTES </Link>
                    <Link to="/categories" >CATEGORIES </Link>
                    <Link to="/home" onClick={handleLogout}>LOGOUT</Link>
                  </div>
                </div>
              </div>
            </nav>

          ) : (
              <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                  <a className="navbar-brand" href="/">Notes App</a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav">
                      <div>
                        <Link to="/home" >HOME </Link>
                        <Link to="/login" >LOGIN </Link>
                        <Link to="/register">REGISTER </Link>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>

            )
        }

        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Home} />
          <Route path="/notes" component={NoteList} exact={true} />
          <Route path="/notes/add-notes" component={NoteCreate} />
          <Route path="/notes/note-detail/:note" component={NoteShow} />
          <Route path="/notes/edit-note/:note" component={EditNote} />
          <Route path="/categories" component={CategoriesList} exact={true} />
          <Route path="/categories/category-detail/:category" component={CategoryView} />
          <Route path="/categories/category-edit/:category" component={CategoryEdit} />
        </Switch>

      </BrowserRouter>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users
  }
}

export default connect(mapStateToProps)(App)

