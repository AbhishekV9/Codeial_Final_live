import { APIUrls } from '../helpers/urls';
import {UPDTAE_POSTS} from './actionTypes'

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