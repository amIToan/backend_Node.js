import { SET_LISTS, ADD_POST, DELETE_POST, FIND_POST,UPDATE_POST } from "../contexts/constants";
export const postReducer = (statePost, action) => {
    const { type, payload } = action
    switch (type) {
        case SET_LISTS : 
        return {
            ...statePost,
            postLoading: payload.postLoading,
            postLists : payload.postLists,
        }
        case ADD_POST : 
        return {
            ...statePost,
            postLoading: false,
            newPost : payload,
        }
        case DELETE_POST : 
        return {
            ...statePost,
            postLoading: false,
            postLists : statePost.postLists.filter( item => item !== payload ),
        }
        case FIND_POST : 
        return {
            ...statePost,
            post: payload,
        }
        case UPDATE_POST : 
            const newPosts = statePost.postLists.map(post =>
            post._id === payload._id ? payload : post
            )
        return {
            ...statePost,
            postLists : newPosts ,
        }              
        default:
            return statePost;
    }
}