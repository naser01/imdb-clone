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
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

//REDUX
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../../redux/types';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    marginTop: '2%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  }
});

class Navbar extends Component {
  //const { open } = this.state;
  /** 
   * 
  */
  //const[anchorEl, setAnchorEl] = React.useState(null);
  state = {
    open: false,
    search: ''
  }
  handleClick = (event) => {
    //setAnchorEl(event.currentTarget);
    this.setState({ open: true })
  };

  handleClose = () => {
    //setAnchorEl(null);
    this.setState({ open: false })
  };

  handleLogout = () => {
    this.props.logoutUser()
  }

  render() {
    const { classes } = this.props;
    console.log(this.state.search)
    return (
      <AppBar className="homepage-navbar">
        <div className="display-flex">
          <IconButton className="homepage-navbar-button" style={{ marginLeft: '1%' }} edge="start" onClick={this.handleLogout} color="inherit" aria-label="menu">
            <ExitToAppIcon />
          </IconButton>
          <form className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => this.setState({ search: event.target.value })}
            />
          </form>
          < IconButton onClick={this.handleClick} className="homepage-navbar-button" edge="start" color="inherit" aria-label="menu">
            <AccountCircle style={{ fontSize: 40 }} />
            <Menu
              id="simple-menu"
              anchorEl={null}
              keepMounted
              open={this.state.open}
              onClose={this.handleClose}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={this.handleClose}>Profile</MenuItem>
              <MenuItem onClick={this.handleClose}>My Reviews</MenuItem>
              <MenuItem onClick={this.handleClose}>Liked Movies</MenuItem>
            </Menu>
          </IconButton>

        </div>
      </AppBar>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = { logoutUser };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Navbar));
