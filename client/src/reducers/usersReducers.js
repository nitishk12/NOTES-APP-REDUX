const usersInitialState = {}

const usersReducers = (state = usersInitialState , action) => {
    switch(action.type) {

        case 'SET_USERS' : {
            return {...action.payload}
        }

        case 'REMOVE_USER' : {
            return {}
        }

        default : {
            return {...state}
        }
    }
}

export default usersReducers