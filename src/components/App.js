import React from 'react';
import { connect } from 'react-redux';
import  {BrowserRouter as Router,Link,Route } from 'react-router-dom'; //renaming BrowserRouter as Router for us
import PropTypes from 'prop-types';

import { fetchPosts } from '../actions/posts';
import { PostsList,Navbar } from './'; //automatically importing from index.js

//all 3 are dummy components ,for learning porpose
const Login= () => <div> Login</div>
const SignUp= () => <div> SignUp</div> 
const Home= () =><div> Home</div> 


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
          <ul>
            <li>
              <Link to='/'>
                {/* link tag internally usses <a> tag only but <a> tag gives reloading while loading href and link tag dosent do this */}
                Home
              </Link>           
            </li>
            <li>
            <Link to='/login'>Login</Link>
            </li>
            <li>
            <Link to='/signup'>SignUp</Link>   
            </li>
          </ul>

           {/* whatever above this lines are will be common if we route to any component */}
          <Route exact path="/" component={Home} /> 
          {/* this means if my path becomes exactly "/" then  i want to show Home component otherwise localhost:3000/login will show home as well as login*/}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
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
