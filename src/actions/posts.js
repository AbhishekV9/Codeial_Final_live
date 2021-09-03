import { APIUrls } from '../helpers/urls';
import {UPDTAE_POSTS,ADD_POST} from './actionTypes'
import { getAuthTokenFromLocalStorage, getFormBody } from '../helpers/utils';

export function fetchPosts(){
    return(dispatch)=>{
        const url=APIUrls.fetchPost();
        fetch(url)
         .then((resposnse)=>{
             return resposnse.json() //returns another promise so write another then
         }).then((data)=>{
             console.log(data);
             dispatch(updatePosts(data.data.posts));
         }).catch(console.error());
    }
}

export function updatePosts(posts){
    return{
        type:UPDTAE_POSTS,
        posts
    }
}

export function addPost(post) {
    return {
      type: ADD_POST,
      post,
    };
  }
  
  export function createPost(content) {
    return (dispatch) => {
      const url = APIUrls.createPost();
  
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
        },
        body: getFormBody({ content }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('dATA', data);
  
          if (data.success) {
            dispatch(addPost(data.data.post));
          }
        });
    };
  }
  