import axios from 'axios'

export const setUser = (users) => {
    return {
        type: "SET_USERS",
        payload: users
    }
}

export const removeUser = () => {
    return { type: "REMOVE_USER" }
}

export const startLoginUser = (formData, redirect) => {
    return (dispatch) => {
        axios.post('http://localhost:3031/users/login', formData)
            .then(response => {
                console.log(response)
                if (response.data.hasOwnProperty('errors')) {
                    alert(response.data.errors)
                } else {
                    localStorage.setItem('x-auth', response.data.token)
                    console.log('localStorage', localStorage)
                    dispatch(setUser(response.data.user))
                    redirect()
                }
            })

            .catch(err => alert(err))
    }
}

export const startRegisterUser = (formData, redirect) => {
    return (dispatch) => {
        axios.post('http://localhost:3031/users/register', formData)
            .then(response => {
                console.log('response', response.data)
                if (response.data.hasOwnProperty('errors') || response.data.hasOwnProperty('driver')) {
                    if (response.data.hasOwnProperty('errors')) {
                        alert(response.data.errors)
                    } else {
                        alert(response.data.errmsg)
                    }
                } else {
                    redirect()
                    dispatch(setUser(response.data))
                }
            })
            .catch(err => window.alert(err))
    }
}
export const startRemoveUser = () => {
    return (dispatch) => {
        axios.delete('http://localhost:3031/users/logout', {
            headers: { 'x-auth': localStorage.getItem('x-auth') }
        })
            .then(response => {
                if (response.data.errors) {
                    alert(response.data.errors)
                } else {
                    localStorage.clear()
                    dispatch(removeUser())
                }
            })
    }
} 