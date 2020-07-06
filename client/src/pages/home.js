import React, { Component } from 'react'
import Navbar from '../components/NavBar/Navbar';
import MovieCard from '../components/MovieCard/MovieCards';
import MoviesDisplay from '../components/MoviesDisplay/MoviesDisplay';

class home extends Component {
    render() {
        return (
            <div>
                
                <Navbar />
                <MoviesDisplay style={{ marginTop: '10%' }} />
            </div>
        )
    }
}

export default home
