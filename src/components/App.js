import React from 'react';
import { connect } from 'react-redux';
import  {BrowserRouter as Router,Link,Route,Switch } from 'react-router-dom'; //renaming BrowserRouter as Router for us
import PropTypes from 'prop-types';

import { fetchPosts } from '../actions/posts';
import { Home,Navbar,Page404, } from './'; //automatically importing from index.js

//all 3 are dummy components ,for learning porpose
const Login= () => <div> Login</div>
const SignUp= () => <div> SignUp</div> 



class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }
 
  //we have to wrap everything between router:-this will basically tell react router that hey this is our root application
  render() {
    const { posts } = this.props;
    return (
      <Router> 
        <div>
          <Navbar />
          {/* <PostsList posts={posts} /> */} 
          <Switch>
              <Route exact path="/" render={(props)=>{
                return <Home {...props} posts={posts} />
              }} />  
              {/* when i want to pass props in Route tag than instead of using component i have to use render but because of this the default props like history that was recived by Home will not be recived so we have to send default props also which is recived by our callback from react */}
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route  component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

App.propTypes={
  posts:PropTypes.array.isRequired
 
};

export default connect(mapStateToProps)(App);
