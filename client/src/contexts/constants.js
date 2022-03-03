const defaultUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/api' : 'lololol lenroi'
const local_token = 'LOCAL_TOKEN'
const SET_LISTS = 'SET_LISTS'
const ADD_POST = 'ADD_POST'
const DELETE_POST = 'DELETE_POST'
const FIND_POST = 'FIND_POST'
const UPDATE_POST = 'UPDATE_POST'
export {defaultUrl as default, local_token, SET_LISTS, ADD_POST, DELETE_POST, FIND_POST, UPDATE_POST};