import React, { useState, useReducer, createContext } from 'react';
import axios from 'axios';
import { default as defaultUrl, SET_LISTS, ADD_POST, DELETE_POST, FIND_POST, UPDATE_POST } from "./constants";
import { postReducer } from '../reducers/postReducer';
export const PostContextWrap = createContext();
const Postcontext = ({ children }) => {
    // State
    const [postState, dispatch] = useReducer(postReducer, {
        post: {
            title: '',
            description: '',
            url: '',
            status: '',
        },
        postLoading: true,
        postLists: [],
    })
    // show addContentModal 
    const [isShowed, setShow] = useState(false);
    //  get all data
    const getPosts = async () => {
        try {
            const response = await axios.get(`${defaultUrl}/posting/`);
            if (response.data.success) {
                dispatch({ type: SET_LISTS, payload: { postLoading: false, postLists: response.data.posts } })
            }
        } catch (error) {
            return error.response.data ? error.response.data : 'Error'
        }

    }
    // Add Post
    const addPosts = async (newPost) => {
        try {
            const response = await axios.post(`${defaultUrl}/posting/usersPost`, newPost);
            if (response.data.success) {
                dispatch({ type: ADD_POST, payload: response.data.post })
                return response.data
            }
        } catch (error) {
            console.log(error)
            return error.response.data ? error.response.data : 'Error'
        }

    }
    // Showing Toast
    const [isToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })
    // DELETE POST
    const deletingPosts = async (deletedPostId) => {
        try {
            const response = await axios.delete(`${defaultUrl}/posting/${deletedPostId}`);
            if (response.data.success) {
                dispatch({ type: DELETE_POST, payload: deletedPostId })
                setShowToast({ show: true, message: response.data.message, type: response.data.success ? 'success' : 'danger' })
            }
        } catch (error) {
            console.log(error)
            return error.response.data ? error.response.data : 'Error'
        }

    }
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)
    // Find post when user is updating post
    const findPost = postId => {
        const post = postState.postLists.find(post => post._id === postId)
        dispatch({ type: FIND_POST, payload: post })
    }

    // Update post
    const updatePost = async updatedPost => {
        try {
            const response = await axios.put(
                `${defaultUrl}/posting/${updatedPost._id}`,
                updatedPost
            )
            if (response.data.success) {
                console.log(response.data)
                dispatch({ type: UPDATE_POST, payload: response.data.newPost })
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' }
        }
    }
    // Data
    const postContextData = { getPosts, postState, isShowed, setShow, addPosts, isToast, setShowToast, deletingPosts, showUpdatePostModal, setShowUpdatePostModal, findPost, updatePost }
    return (
        <PostContextWrap.Provider value={postContextData}>
            {children}
        </PostContextWrap.Provider>
    );
}

export default Postcontext;
