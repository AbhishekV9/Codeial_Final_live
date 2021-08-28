import {UPDTAE_POSTS} from '../actions/actionTypes';

export default function posts (state=[],action){
    switch(action.type){
        case UPDTAE_POSTS:
            return action.posts; //this will be the new state
        default:
            return state;
    }
}