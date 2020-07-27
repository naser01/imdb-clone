import { LOADING_UI, REMOVE_LOADING, SEARCH_MOVIE, TOP_MOVIES, POPULAR_MOVIES, UPCOMMING_MOVIES } from '../types';
import axios from 'axios';
import { json } from 'express';

export const searchMovie = (searchword) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    console.log(searchword);
    /** 
        axios.get('/account/signin', userData)
            .then(res => {
                dispatch({ type: REMOVE_LOADING });
                dispatch({
                    type: SEARCH_MOVIE,
                    payload: res.data
                })
            })
            .catch(err => {
                json.send(err);
})*/
}

export const topMovies = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    /** 
        axios.get('/account/signin', userData)
            .then(res => {
                dispatch({ type: REMOVE_LOADING });
                dispatch({
                    type: TOP_MOVIES,
                    payload: res.data
                })
            })
            .catch(err => {
                json.send(err);
})*/
}

export const popularMovies = () => (dispatch) => {
    dispatch({ type: LOADING_UI });

    /** 
        axios.get('/account/signin')
            .then(res => {
                dispatch({ type: REMOVE_LOADING });
                dispatch({
                    type: POPULAR_MOVIES,
                    payload: res.data
                })
            })
            .catch(err => {
                json.send(err);
})*/
}

export const upcommingMovies = () => (dispatch) => {
    dispatch({ type: LOADING_UI });

    /** 
        axios.get('/account/signin')
            .then(res => {
                dispatch({ type: REMOVE_LOADING });
                dispatch({
                    type: UPCOMMING_MOVIES,
                    payload: res.data
                })
            })
            .catch(err => {
                json.send(err);
})*/
}