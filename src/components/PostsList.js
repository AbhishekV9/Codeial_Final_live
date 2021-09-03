import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CreatePost,  Post } from './';

class PostsList extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="posts-list">
        <CreatePost />
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    );
  }
}


//telling that postsList will recive posts as props wich will be an array and it is actually required and it will throw an error if we pas any posts as any other data types
PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostsList;
