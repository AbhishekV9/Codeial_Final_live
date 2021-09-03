import {UPDTAE_POSTS, ADD_POST} from '../actions/actionTypes';

export default function posts (state=[],action){
    switch(action.type){
        case UPDTAE_POSTS:
            return action.posts; //this will be the new state
        case ADD_POST:
            return [action.post, ...state]; //returning array and adding newPost to the top and then the previous state
        default:
            return state;
    }
}