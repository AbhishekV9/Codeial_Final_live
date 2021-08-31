import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom'; //renaming BrowserRouter as Router for us
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';

import { fetchPosts } from '../actions/posts';
import { Home, Navbar, Page404, Login, Signup as SignUp ,Settings} from './'; //automatically importing from index.js
import { authenticateUser } from '../actions/auth';

//const Settings= () => <div> settings </div> dummy component

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedin, path, component: Component } = privateRouteProps;
  //console.log('privateRouteProps',privateRouteProps);
  return (
    <Route
      path={path}
      render={(props) => {
        //console.log('sdfsfdsd',props);
        return isLoggedin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {   //The state object can be accessed via this.props.location.state in the redirected-to component
                from: props.location,  //this is from where the user is comming from
                //2 doubts ---Q1-how state is going inside location 
                //Q2- location has 4 variables how we are getting only pathname inside from
              },
            }}
          />
        );
      }}
    />
  );
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());

    const token = localStorage.getItem('token');

     if (token) {
       const user = jwt_decode(token);
       console.log('user', user);
       this.props.dispatch(authenticateUser({
         name:user.name,
         email:user.email,
         _id:user._id
       }))
     }
  }

  //we have to wrap everything between router:-this will basically tell react router that hey this is our root application
  render() {
    const { posts,auth } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
          {/* <PostsList posts={posts} /> */}
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return <Home {...props} posts={posts} />;
              }}
            />
            {/* when i want to pass props in Route tag than instead of using component i have to use render but because of this the default props like history that was recived by Home will not be recived so we have to send default props also which is recived by our callback from react */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <PrivateRoute path="/settings" component={Settings} isLoggedin={auth.isLoggedin} />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth:state.auth
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
