import axios from 'axios'

export const setNotes = (notes) => {
    return {
        type : "SET_NOTES",
        payload : notes
    }
}

export const startGetNotes = () => {
    return (dispatch) => {
        axios.get('http://localhost:3031/notes', {
            headers : {'x-auth' : localStorage.getItem('x-auth')}
        })
            .then(response => {
                console.log('categories',response.data)
                if(response.data.message){
                    alert(response.data.message)
                }else {
                    dispatch(setNotes(response.data))
                }
            })

            .catch(err => alert(err))
    }
}

export const addNote = (note) => {
    return {
        type : "ADD_NOTE",
        payload : note
    }
}

export const startAddNotes = (notes, redirect) => {
    return (dispatch) => {
        console.log('notes', notes)
        axios.post('http://localhost:3031/notes', notes, {
            headers : {
                'x-auth' : localStorage.getItem('x-auth')}
        })
            .then(response => {
                console.log('datatatatattata',response.data)
                if(response.data.errors){
                    alert(response.data.message)
                } else {
                    dispatch(addNote(response.data))
                    redirect()
                }
            })
    }
    
}

export const removeNote = (id) => {
    return {
        type : 'REMOVE_NOTE',
        payload : id
    }
} 

export const startRemoveNote = (id) => {
    return (dispatch) => {
        console.log('id', id)
        axios.delete(`http://localhost:3031/notes/${id}`, {
            headers : {
                'x-auth' : localStorage.getItem('x-auth')}
        })
            .then(response => {
                console.log('note remove',response.data)
                if(response.data.message){
                    alert(response.data.message)
                } else {
                    dispatch(removeNote(id))
                }
            })
    } 
}

export const editNote = (id, note) => {
    return {
        type : 'EDIT_NOTE',
        payload : {
            id, note
        }
    }
}

export const startEditNote = (id, formData, redirect) => {
    return (dispatch) => {
        axios.put(`http://localhost:3031/notes/${id}`,formData, {
            headers : {
                'x-auth' : localStorage.getItem('x-auth')}
        })
        .then(response => {
            redirect && redirect()
            dispatch(editNote(id, response.data))

        })

    }
} 