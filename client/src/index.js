import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import axios from 'axios'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { setUser } from './actions/usersAction';
import { startGetCategories } from './actions/categoriesAction';
import { startGetNotes } from './actions/notesAction';
import 'bootstrap/dist/css/bootstrap.css'

const store = configureStore()

store.subscribe(() => {
    console.log(store.getState())
})

if (localStorage.getItem('x-auth')) {
    axios.get('http://localhost:3031/users/account', {
        headers: {
            'x-auth': localStorage.getItem('x-auth')
        }
    })
        .then(response => {
            const user = response.data
            console.log(response.data)
            store.dispatch(setUser(user))
            store.dispatch(startGetCategories())
            store.dispatch(startGetNotes())
        })
}

console.log(store.getState())

const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));

