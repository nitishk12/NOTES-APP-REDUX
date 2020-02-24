import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notesReducers from '../reducers/notesReducers'
import categoriesReducers from '../reducers/categoriesReducers'
import usersReducers from '../reducers/usersReducers'

const configureStore = () => {
    const store = createStore(combineReducers({
        notes: notesReducers,
        categories: categoriesReducers,
        users: usersReducers
    }), applyMiddleware(thunk))

    return store
}

export default configureStore