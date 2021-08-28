import {UPDTAE_POSTS} from './actionTypes'

export function fetchPosts(){
    return(dispatch)=>{
        const url='http://codeial.codingninjas.com:8000/api/v2/posts?page=1&limit=5';
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