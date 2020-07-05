import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            authenticated === false ? <Redirect to="/login" /> : <Component {...props} />}
    />
)

AuthRoute.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(AuthRoute);