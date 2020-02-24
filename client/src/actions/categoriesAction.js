import axios from 'axios'

export const setCategories = (categories) => {
    return {
        type : "SET_CATEGORIES",
        payload : categories
    }
}

export const startGetCategories = () => {
    return (dispatch) => {
        axios.get('http://localhost:3031/categories', {
            headers : {'x-auth' : localStorage.getItem('x-auth')}
        })
            .then(response => {
                console.log('categories',response.data)
                if(response.data.message){
                    alert(response.data.message)
                }else {
                    dispatch(setCategories(response.data))
                }
            })

            .catch(err => alert(err))
    }
}

export const addCategory = (category) => {
    return {
        type : 'ADD_CATEGORY',
        payload : category
    }
}

export const startAddCategory = (formData) => {
    return (dispatch) => {
        axios.post('http://localhost:3031/categories', formData, {
            headers : {'x-auth' : localStorage.getItem('x-auth')}
        })
            .then(response => {
                if(response.data.errors){
                    alert(response.data.message)
                } else {
                    dispatch(addCategory(response.data))
                }
            })

    }
}

export const editCategory = (id, category) => {
    return {
        type : 'EDIT_CATEGORY',
        payload : {
            id, category
        }
    }
}

export const startEditCategory = (id, formData, redirect) => {
    return (dispatch) => {
        axios.put(`http://localhost:3031/categories/${id}`,formData, {
            headers : {
                'x-auth' : localStorage.getItem('x-auth')}
        })
        .then(response => {
            redirect && redirect()
            dispatch(editCategory(id, response.data))
        })
    }
}

export const removeCategory = (id) => {
    return {
        type : "REMOVE_CATEGORY",
        payload : id
    }
}

export const startRemoveCategory = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3031/categories/${id}`, {
            headers : {
                'x-auth' : localStorage.getItem('x-auth')}
        })
        .then(response => {
            dispatch(removeCategory(id, response.data))
        })
    }
}