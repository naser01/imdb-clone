import React, { Component } from 'react'
import './Navbar.css';

//Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';

//REDUX
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../../redux/types';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';
import { Link } from 'react-router-dom';

const styles = (theme) => ({

});

const Navbar = (props) => {
  const handleLogout = () => {
    this.props.logoutUser()
  }


  //const { open } = this.state;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar className="homepage-navbar">
      <div className="display-flex">
        <IconButton className="homepage-navbar-button" style={{ marginLeft: '1%' }} edge="start" onClick={handleLogout} color="inherit" aria-label="menu">
          <ExitToAppIcon />
        </IconButton>
        <IconButton onClick={handleClick} className="homepage-navbar-button" edge="start" color="inherit" aria-label="menu">
          <AccountCircle style={{ fontSize: 40 }} />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My Reviews</MenuItem>
          <MenuItem onClick={handleClose}>Liked Movies</MenuItem>
        </Menu>
      </div>
    </AppBar>
  )

}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = { logoutUser };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Navbar));
