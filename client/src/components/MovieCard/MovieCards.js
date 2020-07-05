import React, { Component } from 'react';
import "./MovieCards.css"
//Material UI
import withStyles from '@material-ui/core/styles/withStyles';
//REDUX
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../../redux/types';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';
import { Link } from 'react-router-dom';

class MovieCards extends Component {
    render() {
        return (
            <div className="MovieCard">

            </div>
        )
    }
}

export default MovieCards;
