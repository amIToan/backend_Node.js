export const processReducer = (state, action) => {
    const { type, payload : { loading, isAuthenticated, user}} = action
    switch (type) {
        case 'SET_AUTH':
            return{
                ...state,
                loading,
                isAuthenticated,
                user
            }
        default:
            return state;
    }
}