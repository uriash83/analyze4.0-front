import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {

    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} 
            render={props => 
                localStorage.getItem('token') ? (
                    <Component {...props} />
                ) :(
                    <Redirect to="/login" />
                 )
        } />
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

export default connect(mapStateToProps,null)(PrivateRoute);