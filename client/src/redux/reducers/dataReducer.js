import { LOADING_UI, REMOVE_LOADING, SEARCH_MOVIE, TOP_MOVIES, POPULAR_MOVIES, UPCOMMING_MOVIES } from '../types';

const initialState = {
    loading: false,
    searchedMovie: {},
    topMovies: [],
    popularMovies: [],
    upcommingMovies: []
};


export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case REMOVE_LOADING:
            return {
                ...state,
                loading: false
            }
        case SEARCH_MOVIE:
            return {
                ...state,
                searchedMovie: action.payload
            }
        case TOP_MOVIES:
            return {
                ...state,
                topMovies: action.payload
            }
        case POPULAR_MOVIES:
            return {
                ...state,
                popularMovies: action.payload
            }
        case UPCOMMING_MOVIES:
            return {
                ...state,
                upcommingMovies: action.payload
            }
        default:
            return state;
    }
}       